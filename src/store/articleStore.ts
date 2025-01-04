import { create } from 'zustand';
import { Article, ArticleParams } from '../types/article';

interface ArticleStore {
  articles: Article[];
  lastFetched: number | null;
  setArticles: (articles: Article[]) => void;
  clearArticles: () => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  lastFetched: null,
  setArticles: (articles) => set({ articles, lastFetched: Date.now() }),
  clearArticles: () => set({ articles: [], lastFetched: null }),
})); 