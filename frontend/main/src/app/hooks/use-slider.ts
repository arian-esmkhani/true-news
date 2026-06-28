import { useCallback, useState } from "react";
import { sliderService } from "../service/slider_service";

export const useSlider = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const newestSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await sliderService.newestSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const trendSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await sliderService.trendSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const interviewSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await sliderService.interviewSlider();
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const noteSlider = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await sliderService.noteSlider();
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
        newestSlider,
        trendSlider,
        interviewSlider,
        noteSlider
    };
}