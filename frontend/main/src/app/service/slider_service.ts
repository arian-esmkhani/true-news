import { DataDto } from "../types/data-type";

export const sliderService = {
    async newestSlider() {
        const response = await fetch(`/api/slider/newest`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<DataDto[]>;
    },

    async trendSlider() {
        const response = await fetch(`/api/slider/trend`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<DataDto[]>;
    },

    async interviewSlider() {
        const response = await fetch(`/api/slider/interview`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<DataDto[]>;
    },

    async noteSlider() {
        const response = await fetch(`/api/slider/note`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to register');
        return response.json() as Promise<DataDto[]>;
    },
}