'use client';

import { useState, useEffect } from 'react';
import { getAIInsights } from '@/lib/api';
import type { AIInsight } from '@/lib/types';
import LoadingSpinner from './LoadingSpinner';

interface AIInsightsProps {
    bookId: string;
    className?: string;
}

export default function AIInsights({ bookId, className = '' }: AIInsightsProps) {
    // State management for the insights data and loading/error states
    const [insights, setInsights] = useState<AIInsight | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Effect hook to fetch insights when the component mounts or bookId changes
    useEffect(() => {
        let mounted = true; // Flag to prevent setting state after unmount

        async function fetchInsights() {
            setLoading(true);
            setError(null);

            try {
                const data = await getAIInsights(bookId);
                // Only update state if the component is still mounted
                if (mounted) {
                    setInsights(data);
                }
            } catch (err) {
                if (mounted) {
                    setError('Failed to load AI insights. Please try again later.');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        fetchInsights();

        // Cleanup function to prevent memory leaks
        return () => {
            mounted = false;
        };
    }, [bookId]);

    // Loading state
    if (loading) {
        return (
            <div className={`mt-4 ${className}`}>
                <LoadingSpinner />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={`mt-4 text-red-500 ${className}`}>
                {error}
            </div>
        );
    }

    // No insights available state
    if (!insights) {
        return null;
    }

    // Render insights
    return (
        <div className={`mt-4 p-4 bg-purple-50 rounded-lg ${className}`}>
            {/* Header */}
            <h3 className="text-sm font-semibold text-purple-700 mb-2">
                AI Insights
            </h3>

            {/* Insights content */}
            <p className="text-sm text-purple-900 leading-relaxed">
                {insights.insights}
            </p>

        </div>
    );
}

// Loading skeleton for AI Insights
export function AIInsightsSkeleton() {
    return (
      <div className="mt-4 p-4 bg-purple-50 rounded-lg animate-pulse">
          <div className="h-4 bg-purple-200 rounded w-24 mb-2"></div>
          <div className="space-y-2">
              <div className="h-3 bg-purple-200 rounded w-full"></div>
              <div className="h-3 bg-purple-200 rounded w-5/6"></div>
              <div className="h-3 bg-purple-200 rounded w-4/6"></div>
          </div>
      </div>
  );
}