import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY não está configurada');
    return NextResponse.json(
      { error: 'Configuração do Stripe não encontrada' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  });
  try {
    const { email, name } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Produto Premium',
              description: 'Acesso completo ao conteúdo exclusivo',
            },
            unit_amount: 1990, // R$ 19,90 em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pago?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?canceled=true`,
      metadata: {
        customer_name: name,
        customer_email: email,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 