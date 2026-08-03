import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getProductsFromBlogger } from '@/lib/blogger';

export async function GET() {
  try {
    const products = await getProductsFromBlogger();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products from Blogger:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
