export type ContentType = 'news' | 'movie' | 'social';

export interface FeedItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  image: string;
  source: string;
  url?: string;
  publishedAt?: string;
  rating?: number;
  hashtags?: string[];
  likes?: number;
  comments?: number;
  avatar?: string;
  username?: string;
}