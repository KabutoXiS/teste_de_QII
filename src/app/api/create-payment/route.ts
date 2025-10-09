import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json()

    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY

    console.log('Verificando credenciais do Mercado Pago...')
    console.log('Access Token presente:', !!accessToken)
    console.log('Public Key presente:', !!publicKey)

    if (!accessToken) {
      console.error('MERCADOPAGO_ACCESS_TOKEN não configurado')
      return NextResponse.json(
        { 
          error: 'Credenciais do Mercado Pago não configuradas',
          details: 'MERCADOPAGO_ACCESS_TOKEN não encontrado nas variáveis de ambiente'
        },
        { status: 500 }
      )
    }

    if (!publicKey) {
      console.error('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY não configurado')
      return NextResponse.json(
        { 
          error: 'Credenciais do Mercado Pago não configuradas',
          details: 'NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY não encontrado nas variáveis de ambiente'
        },
        { status: 500 }
      )
    }

    // Validar formato do access token
    if (!accessToken.startsWith('APP_USR-') && !accessToken.startsWith('TEST-')) {
      console.error('Formato inválido do access token:', accessToken.substring(0, 10) + '...')
      return NextResponse.json(
        { 
          error: 'Formato inválido das credenciais do Mercado Pago',
          details: 'Access token deve começar com APP_USR- ou TEST-'
        },
        { status: 500 }
      )
    }

    // Determinar se está em modo de teste
    const isTest = accessToken.includes('TEST')
    console.log('Modo de teste:', isTest)

    // Criar preferência de pagamento
    const preference = {
      items: [
        {
          title: description || 'Resultado do Teste de QI',
          unit_price: Number(amount) || 0.99,
          quantity: 1,
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?payment=success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?payment=failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?payment=pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [],
        installments: 1
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhook`,
      external_reference: `iq-test-${Date.now()}`
    }

    console.log('Criando preferência de pagamento...')
    console.log('Dados da preferência:', JSON.stringify(preference, null, 2))

    // Fazer requisição para a API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference)
    })

    console.log('Status da resposta da API:', response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erro da API do Mercado Pago:', errorData)
      
      let errorMessage = 'Erro ao criar preferência de pagamento'
      let errorDetails = errorData

      // Tratar erros específicos do Mercado Pago
      try {
        const parsedError = JSON.parse(errorData)
        if (parsedError.message) {
          errorMessage = parsedError.message
        }
        if (parsedError.cause && parsedError.cause.length > 0) {
          errorDetails = parsedError.cause.map((c: any) => c.description).join(', ')
        }
      } catch (e) {
        // Se não conseguir parsear, usar o texto original
      }

      // Erros comuns e suas soluções
      if (response.status === 401) {
        errorMessage = 'Credenciais do Mercado Pago inválidas'
        errorDetails = 'Verifique se o access token está correto e ativo'
      } else if (response.status === 400) {
        errorMessage = 'Dados da preferência inválidos'
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          details: errorDetails,
          status: response.status
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Preferência criada com sucesso:', data.id)
    
    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      is_test: isTest
    })

  } catch (error) {
    console.error('Erro interno ao processar pagamento:', error)
    
    let errorMessage = 'Erro interno do servidor'
    let errorDetails = 'Erro desconhecido'

    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = error.stack || error.message
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    )
  }
}