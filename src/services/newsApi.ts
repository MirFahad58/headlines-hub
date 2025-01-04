import axios from 'axios';
import { Article, ArticleParams } from '../types/article';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchNewsAPI = async (params: ArticleParams): Promise<Article[]> => {
  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params: {
      q: params.keywords,
      from: params.fromDate,
      to: params.toDate,
      apiKey: NEWS_API_KEY,
    },
  });

  return response.data.articles.map((article: any) => ({
    id: `newsapi-${article.url}`,
    title: article.title,
    description: article.description,
    url: article.url,
    source: 'NewsAPI',
    publishedAt: article.publishedAt,
    imageUrl: article.urlToImage,
  }));
};

export const fetchGuardian = async (params: ArticleParams): Promise<Article[]> => {
  const response = await axios.get(`https://content.guardianapis.com/search`, {
    params: {
      q: params.keywords,
      'from-date': params.fromDate,
      'to-date': params.toDate,
      'api-key': GUARDIAN_API_KEY,
    },
  });

  return response.data.response.results.map((article: any) => ({
    id: `guardian-${article.id}`,
    title: article.webTitle,
    description: article.fields?.bodyText,
    url: article.webUrl,
    source: 'The Guardian',
    publishedAt: article.webPublicationDate,
  }));
};

export const fetchNYT = async (params: ArticleParams): Promise<Article[]> => {
  const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
    params: {
      q: params.keywords,
      begin_date: params.fromDate?.replace(/-/g, ''),
      end_date: params.toDate?.replace(/-/g, ''),
      'api-key': NYT_API_KEY,
    },
  });

  return response.data.response.docs.map((article: any) => ({
    id: `nyt-${article._id}`,
    title: article.headline.main,
    description: article.abstract,
    url: article.web_url,
    source: 'New York Times',
    publishedAt: article.pub_date,
    imageUrl: article.multimedia[0]?.url,
  }));
}; 