'use client'

export default function PagamentoSucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Obrigado pela sua compra! Seu pagamento foi processado com sucesso. 
          Você receberá os detalhes de acesso por email em breve.
        </p>
        
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Detalhes da Compra
          </h2>
          <div className="space-y-2 text-gray-600">
            <p><strong>Produto:</strong> Produto Premium</p>
            <p><strong>Valor:</strong> R$ 19,90</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-semibold">Pago</span></p>
          </div>
        </div>
      </div>
    </div>
  )
} 