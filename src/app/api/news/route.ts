import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? 'technology';
  const q = searchParams.get('q');
  const pageSize = searchParams.get('pageSize') ?? '10';

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'NEWS_API_KEY not set' }, { status: 500 });
  }

  const url = q
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${pageSize}&language=en&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&language=en&country=us&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}