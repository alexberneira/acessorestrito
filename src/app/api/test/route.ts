import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API funcionando',
    env: {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'não configurado'
    }
  });
} 