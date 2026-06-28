import { useCallback, useState } from "react";
import { articleService } from "../service/article-service";

export const useArticle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getArticle = useCallback(async (topicID: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await articleService.getArticle(topicID);
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
        getArticle
    };
}