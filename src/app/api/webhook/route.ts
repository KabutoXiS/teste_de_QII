import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log para debug (remover em produção)
    console.log('Webhook recebido:', body)
    
    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id
      
      // Aqui você pode implementar lógica adicional para:
      // - Verificar o status do pagamento
      // - Atualizar banco de dados
      // - Enviar emails de confirmação
      // - etc.
      
      console.log(`Pagamento ${paymentId} processado`)
    }
    
    // Sempre retornar 200 para confirmar recebimento
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}

// Método GET para verificação do webhook
export async function GET() {
  return NextResponse.json({ status: 'Webhook ativo' })
}