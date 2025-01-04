import { useEffect } from 'react';
import { useArticles } from '../hooks/useArticles';

export const ArticleList = () => {
  const { articles, loading, error, fetchArticles } = useArticles();

  useEffect(() => {
    fetchArticles({
      keywords: 'technology',
      fromDate: '2024-02-01',
      toDate: '2024-02-29',
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <small>Source: {article.source}</small>
        </div>
      ))}
    </div>
  );
}; 