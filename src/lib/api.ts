import { Book, AIInsight, APIError } from './types';

// Base configuration for our API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Default headers and configuration for all requests
const defaultConfig: RequestInit = {
  credentials: 'include', // Necessary for CORS with authentication
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper function to handle API errors consistently
function handleError(error: unknown): never {
  if (error instanceof Response) {
    throw new Error(`HTTP error! status: ${error.status}`);
  }
  throw error;
}

// Generic fetch wrapper with error handling and type safety
async function fetchApi<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config.headers,
      },
    });

    if (!response.ok) {
      // Try to parse error response
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
}

// Function to get all books
export async function getBooks(): Promise<Book[]> {
  return fetchApi<Book[]>('/books');
}

// Function to get a single book by ID
export async function getBook(id: string): Promise<Book> {
  return fetchApi<Book>(`/books/${id}`);
}

// Function to search books
export async function searchBooks(query: string): Promise<Book[]> {
  // If no query is provided, return all books
  if (!query.trim()) {
    return getBooks();
  }

  // Build query parameters
  const params = new URLSearchParams({
    title: query,
    author: query,
  });

  return fetchApi<Book[]>(`/books/search?${params}`);
}

// Function to create a new book
export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
  return fetchApi<Book>('/books', {
    method: 'POST',
    body: JSON.stringify(bookData),
  });
}

// Function to update an existing book
export async function updateBook(
  id: string,
  bookData: Partial<Book>
): Promise<Book> {
  return fetchApi<Book>(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookData),
  });
}

// Function to delete a book
export async function deleteBook(id: string): Promise<void> {
  return fetchApi<void>(`/books/${id}`, {
    method: 'DELETE',
  });
}

// Function to get AI insights for a book
export async function getAIInsights(id: string): Promise<AIInsight> {
  return fetchApi<AIInsight>(`/books/${id}/ai-insights`);
}

// Type guard to check if an error is an API error
export function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  );
}

// Helper function to format API errors for display
export function formatAPIError(error: unknown): string {
  if (isAPIError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
