export interface Book {
    id?: string;           // Optional for creation, required after
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    description: string;
  }
  
  export interface AIInsight {
    bookId: string;        // References the book this insight belongs to
    insights: string;      // The AI-generated content
  }
  
  export interface APIError {
    message: string;       // Main error message
    errors?: Record<string, string[]>;  // Validation errors by field
  }
  
  
  export interface APIResponse<T> {
    data: T;
    status: number;
    message?: string;
  }