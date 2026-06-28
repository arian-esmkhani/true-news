import { useCallback, useState } from "react";
import { titleService } from "../service/title-service";

export const useTitle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const newestTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.newestTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const goldTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.goldTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const aiTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.aiTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const warTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.warTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const cultureTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.cultureTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const economyTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.economyTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const politicalTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.politicalTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const technologyTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.technologyTitles();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    
    const suggestTitles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await titleService.suggestTitles();
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
        newestTitles,
        goldTitles,
        aiTitles,
        warTitles,
        cultureTitles,
        economyTitles,
        politicalTitles,
        technologyTitles,
        suggestTitles
    };
}