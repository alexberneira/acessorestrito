'use client'

import { useState } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const { sessionId } = await response.json()
      const stripe = await import('@stripe/stripe-js')
      const stripeInstance = await stripe.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({
          sessionId,
        })
        if (error) {
          console.error('Erro no checkout:', error)
          alert('Erro ao processar pagamento. Tente novamente.')
        }
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Acesso Premium 🔓
          </h1>
          <p className="text-gray-300 mb-4">
            <em>Conteúdo premium. Entrega imediata após o pagamento.</em>
          </p>
          {/* Preço destacado */}
          <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            R$19,90
          </div>
        </div>
        {/* Formulário */}
        <form onSubmit={handlePayment} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-900 text-white placeholder-gray-400"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-900 text-white placeholder-gray-400"
              placeholder="seu@email.com"
            />
            {/* Aviso sobre e-mail */}
            <p className="text-xs text-pink-400 mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              O conteúdo será enviado para este e-mail. Verifique antes de continuar.
            </p>
          </div>
          {/* Gatilho de urgência */}
          <div className="text-center">
            <p className="text-sm text-gray-400 italic">
              ⏳ <em>Disponível por tempo limitado</em>
            </p>
          </div>
          {/* Botão de pagamento */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </div>
            ) : (
              <>
                Desbloquear Conteúdo Privado
                <span className="text-lg">➡️</span>
              </>
            )}
          </button>
        </form>
        {/* Linha de confiança */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300 font-medium">
            🔒 Pagamento 100% seguro com Stripe | 💳 Cartão de crédito aceito
          </p>
        </div>
        {/* Rodapé discreto */}
        <div className="mt-8 pt-6 border-t border-purple-500/20">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Este é um conteúdo digital. Acesso pessoal e sigiloso. Não compartilhável.
          </p>
        </div>
      </div>
    </div>
  )
}
