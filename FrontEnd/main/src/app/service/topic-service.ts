import { TopicResponse } from "../types/topic-type";

export const topicService = {
  async getByTopic(name: string, page: number) {
    const response = await fetch(`/api/topic/by-topic/${name}?page=${page}`, {
      method: 'GET'
    });
    if (response.status === 404) {
      throw new Error('NOT FOUND');
    }
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return response.json() as Promise<TopicResponse>;
  },

  async searchByTopic(name: string, page: number) {
    const response = await fetch(`/api/topic/search-topic/${name}?page=${page}`, {
      method: 'GET'
    });
    if (response.status === 204) {
      throw new Error('NO CONTENT');
    }
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return response.json() as Promise<TopicResponse>;
  },

  async getNewest(page: number) {
    const response = await fetch(`/api/topic/newest?page=${page}`, {
      method: 'GET'
    });
    if (response.status === 404) {
      throw new Error('NOT FOUND');
    }
    if (!response.ok) throw new Error('Failed to fetch coaches');
    return response.json() as Promise<TopicResponse>;
  }
}