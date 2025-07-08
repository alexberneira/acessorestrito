import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    console.log('API route chamada');
    
    // Verificar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY não está configurada');
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY não configurada' },
        { status: 500 }
      );
    }

    console.log('Stripe key encontrada, comprimento:', process.env.STRIPE_SECRET_KEY.length);

    // Tentar criar instância do Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    });

    console.log('Instância do Stripe criada com sucesso');

    // Ler dados do request
    const body = await request.json();
    console.log('Dados recebidos:', { email: body.email, name: body.name });
    const { email, name } = body;

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