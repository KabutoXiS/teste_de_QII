'use client'

import { XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-[#1E293B] mb-4">
            Pagamento Não Aprovado
          </h1>
          
          <p className="text-[#1E293B]/70 mb-8">
            Houve um problema com seu pagamento. Você pode tentar novamente ou escolher outro método de pagamento.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Tentar novamente
          </Link>
        </div>
      </div>
    </div>
  )
}