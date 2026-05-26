import { FeedItem } from '@/types';
import { FALLBACK_NEWS_IMAGE } from '@/constants';

export function transformNewsArticle(article: any, index: number): FeedItem {
  return {
    id: `news-${index}-${Date.now()}`,
    type: 'news',
    title: article.title ?? 'Untitled',
    description: article.description ?? 'No description available.',
    image: article.urlToImage ?? FALLBACK_NEWS_IMAGE,
    source: article.source?.name ?? 'Unknown',
    url: article.url,
    publishedAt: article.publishedAt,
  };
}