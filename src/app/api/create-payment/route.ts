import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json()

    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Mercado Pago access token não configurado' },
        { status: 500 }
      )
    }

    // Criar preferência de pagamento
    const preference = {
      items: [
        {
          title: description || 'Resultado do Teste de QI',
          unit_price: amount || 0.99,
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

    // Fazer requisição para a API do Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Erro da API do Mercado Pago:', errorData)
      return NextResponse.json(
        { error: 'Erro ao criar preferência de pagamento' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Determinar se está em modo de teste
    const isTest = accessToken.includes('TEST')
    
    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
      is_test: isTest
    })

  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}