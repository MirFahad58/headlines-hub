export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface ArticleParams {
  keywords?: string;
  categories?: string[];
  fromDate?: string;
  toDate?: string;
} 