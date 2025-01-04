import { useState } from 'react';
import { useArticleStore } from '../store/articleStore';
import { ArticleParams } from '../types/article';
import { fetchNewsAPI, fetchGuardian, fetchNYT } from '../services/newsApi';

export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { articles, lastFetched, setArticles } = useArticleStore();

  const fetchArticles = async (params: ArticleParams) => {
    // Check if we should fetch new data (3 minutes cache)
    const shouldFetch = !lastFetched || Date.now() - lastFetched > 180000;

    if (!shouldFetch && articles.length > 0) {
      return articles;
    }

    setLoading(true);
    setError(null);

    try {
      const [newsApiArticles, guardianArticles, nytArticles] = await Promise.all([
        fetchNewsAPI(params),
        fetchGuardian(params),
        fetchNYT(params),
      ]);

      const combinedArticles = [
        ...newsApiArticles,
        ...guardianArticles,
        ...nytArticles,
      ].sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setArticles(combinedArticles);
      return combinedArticles;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
  };
}; 