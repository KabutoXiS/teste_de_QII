import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

// Configuração do Mercado Pago para ambiente de teste
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: { 
    timeout: 5000,
    // Forçar ambiente de teste quando usando chaves TEST-
    ...(process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith('TEST-') && {
      sandbox: true
    })
  }
})

export async function POST(request: NextRequest) {
  try {
    const { amount, description } = await request.json()

    const preference = new Preference(client)

    const body = {
      items: [
        {
          id: 'iq-test-result',
          title: description || 'Resultado do Teste de QI',
          quantity: 1,
          unit_price: amount || 0.99,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
      statement_descriptor: 'TESTE QI',
      external_reference: `iq-test-${Date.now()}`,
      // Configurações específicas para ambiente de teste
      ...(process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith('TEST-') && {
        binary_mode: true,
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
      })
    }

    const result = await preference.create({ body })

    // Log para debug
    console.log('Preferência criada:', {
      id: result.id,
      sandbox: process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith('TEST-'),
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    })

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
      // Retornar informação sobre ambiente
      is_test: process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith('TEST-') || false
    })

  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}