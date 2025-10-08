import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

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
    const body = await request.json()
    
    // Log para debug (remover em produção)
    console.log('Webhook recebido:', body)
    
    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id
      
      // Buscar detalhes do pagamento
      const payment = new Payment(client)
      const paymentInfo = await payment.get({ id: paymentId })
      
      console.log('Status do pagamento:', paymentInfo.status)
      console.log('Referência externa:', paymentInfo.external_reference)
      
      // Aqui você pode implementar a lógica para atualizar o status do pagamento
      // Por exemplo, salvar em banco de dados, enviar email, etc.
      
      switch (paymentInfo.status) {
        case 'approved':
          console.log('Pagamento aprovado:', paymentId)
          // Implementar lógica para pagamento aprovado
          break
        case 'pending':
          console.log('Pagamento pendente:', paymentId)
          // Implementar lógica para pagamento pendente
          break
        case 'rejected':
          console.log('Pagamento rejeitado:', paymentId)
          // Implementar lógica para pagamento rejeitado
          break
        default:
          console.log('Status desconhecido:', paymentInfo.status)
      }
    }
    
    // Sempre retornar 200 para confirmar recebimento
    return NextResponse.json({ received: true }, { status: 200 })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    
    // Retornar 200 mesmo com erro para evitar reenvios desnecessários
    return NextResponse.json({ error: 'Erro interno' }, { status: 200 })
  }
}

// Método GET para verificar se o webhook está funcionando
export async function GET() {
  return NextResponse.json({ 
    status: 'Webhook ativo',
    timestamp: new Date().toISOString(),
    environment: process.env.MERCADOPAGO_ACCESS_TOKEN?.startsWith('TEST-') ? 'test' : 'production'
  })
}