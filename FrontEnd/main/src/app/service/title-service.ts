import { TitleDto } from "../types/data-type";

export const titleService = {

    async newestTitles() {
        const response = await fetch(`/api/title/newest`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async goldTitles() {
        const response = await fetch(`/api/title/gold`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async aiTitles() {
        const response = await fetch(`/api/title/ai`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async warTitles() {
        const response = await fetch(`/api/title/war`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async cultureTitles() {
        const response = await fetch(`/api/title/culture`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async economyTitles() {
        const response = await fetch(`/api/title/economy`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async politicalTitles() {
        const response = await fetch(`/api/title/political`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async technologyTitles() {
        const response = await fetch(`/api/title/technology`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },

    async suggestTitles() {
        const response = await fetch(`/api/title/suggest`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<TitleDto[]>;
    },
}