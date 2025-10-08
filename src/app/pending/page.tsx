'use client'

import { Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
          <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-[#1E293B] mb-4">
            Pagamento Pendente ⏳
          </h1>
          
          <p className="text-[#1E293B]/70 mb-8">
            Seu pagamento está sendo processado. Você receberá uma confirmação em breve e poderá acessar o resultado do seu teste de QI.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              💡 <strong>Dica:</strong> Verifique seu email para atualizações sobre o status do pagamento.
            </p>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}