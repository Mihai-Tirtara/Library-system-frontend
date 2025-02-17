import { Book, AIInsight, APIError, APIResponse } from './types';

// Base URL for API requests - using environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Generic fetch wrapper for consistent error handling and typing
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json() as APIError;
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json() as Promise<T>;
}

// Book-related API functions
export async function getBooks(): Promise<Book[]> {
  return fetchApi<Book[]>('/books');
}

export async function getBook(id: string): Promise<Book> {
  return fetchApi<Book>(`/books/${id}`);
}

export async function searchBooks(query: string): Promise<Book[]> {
  // If no query is provided, return all books
  if (!query.trim()) {
    return getBooks();
  }

  const params = new URLSearchParams({
    title: query,
    author: query,
  });

  return fetchApi<Book[]>(`/books/search?${params}`);
}

// AI Insights API functions
export async function getAIInsights(id: string): Promise<AIInsight> {
  return fetchApi<AIInsight>(`/books/${id}/ai-insights`);
}

// Error handling helper
export function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  );
}