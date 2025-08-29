import { useState, useEffect, useCallback, useRef } from "react";
import { useThrottle } from "./useThrottle";
import type { PaginatedResponse } from "../types/api.type";

interface UseInfiniteScrollOptions {
  threshold?: number; // Distance from bottom to trigger load (in pixels)
  throttleMs?: number; // Throttle delay in milliseconds
  initialLoad?: boolean; // Whether to load data on mount
  enabled?: boolean; // Whether infinite scroll is enabled
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
}

export const useInfiniteScroll = <T extends { id: string | number }>(
  fetchFunction: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn<T> => {
  const {
    threshold = 200,
    throttleMs = 300,
    initialLoad = true,
    enabled = true,
  } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadingRef = useRef(false);
  const limit = 10; // Items per page

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || !enabled) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction(page, limit);

      setData((prevData) => {
        const newItems = result.items.filter(
          (item) => !prevData.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevData, ...newItems];
      });

      setHasMore(result.has_next);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchFunction, page, limit, hasMore, enabled]);

  const throttledLoadMore = useThrottle(loadMore, throttleMs);

  const handleScroll = useCallback(() => {
    if (!enabled || loadingRef.current || !hasMore) {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= documentHeight - threshold) {
      throttledLoadMore();
    }
  }, [throttledLoadMore, threshold, enabled, hasMore]);

  const throttledHandleScroll = useThrottle(handleScroll, throttleMs);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setLoading(false);
    setIsInitialized(false);
    loadingRef.current = false;
  }, []);

  const retry = useCallback(async () => {
    setError(null);
    await loadMore();
  }, [loadMore]);

  // Initial load
  useEffect(() => {
    if (initialLoad && !isInitialized && enabled) {
      setIsInitialized(true);
      loadMore();
    }
  }, [initialLoad, isInitialized, enabled, loadMore]);

  // Scroll event listener
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [throttledHandleScroll, enabled]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    retry,
  };
};
