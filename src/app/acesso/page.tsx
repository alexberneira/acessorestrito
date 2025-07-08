'use client'

export default function AcessoPrivado() {
  const handleAcesso = () => {
    // Redirecionar para o checkout principal
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">
            🔓 Acesso Privado Liberado
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Conteúdo exclusivo, digital, entregue com total sigilo.
          </p>
        </div>
        {/* Vantagens */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center text-gray-200 text-sm">
            <span className="text-green-400 mr-3">✅</span>
            Acesso imediato
          </div>
          <div className="flex items-center text-gray-200 text-sm">
            <span className="text-blue-400 mr-3">🔐</span>
            Entrega privada por e-mail
          </div>
          <div className="flex items-center text-gray-200 text-sm">
            <span className="text-purple-400 mr-3">💳</span>
            Pagamento 100% seguro com cartão
          </div>
          <div className="flex items-center text-gray-200 text-sm">
            <span className="text-pink-400 mr-3">📩</span>
            Link exclusivo, visualização limitada
          </div>
        </div>
        {/* Botão de ação */}
        <button
          onClick={handleAcesso}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
        >
          Desbloquear Acesso Agora
          <span className="text-lg">➡️</span>
        </button>
        {/* Urgência */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400 italic">
            ⏳ Promoção válida por tempo limitado
          </p>
        </div>
        {/* Rodapé */}
        <div className="mt-8 pt-4 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Este é um conteúdo digital. Pagamento processado com segurança pela Stripe.
          </p>
        </div>
      </div>
    </div>
  )
} 