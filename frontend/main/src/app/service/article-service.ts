import { ArticleResponse } from "../types/article-type";

export const articleService = {
  async getArticle(topicID: number) {
    const response = await fetch(`/api/article/get/${topicID}`, {
      method: 'GET'
    });
    if (response.status === 404) {
      throw new Error('NOT FOUND');
    }
    if (!response.ok) throw new Error('Failed to fetch exercise');
    return response.json() as Promise<ArticleResponse>;
  }
}