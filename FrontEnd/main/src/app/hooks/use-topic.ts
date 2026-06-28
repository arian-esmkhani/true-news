import { useCallback, useState } from "react";
import { topicService } from "../service/topic-service";

export const useTopic = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); 

    const getByTopic = useCallback(async (name: string, page: number = 0) => {
        setLoading(true);
        setError(null);
        try {
            const result = await topicService.getByTopic(name, page);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const searchByTopic = useCallback(async (name: string, page: number = 0) => {
        setLoading(true);
        setError(null);
        try {
            const result = await topicService.searchByTopic(name, page);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getNewest = useCallback(async (page: number = 0) => {
        setLoading(true);
        setError(null);
        try {
            const result = await topicService.getNewest(page);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        getByTopic,
        searchByTopic,
        getNewest
    };
}