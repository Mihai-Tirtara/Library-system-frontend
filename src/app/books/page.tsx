import { Suspense } from 'react';
import BookList from '@/components/BookList';
import LoadingSpinner from '@/components/LoadingSpinner';

// This is a Server Component that serves as the main books page
export default function BooksPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Our Library Collection</h1>
                <p className="text-gray-600 mt-2">
                    Browse through our collection of books and discover new titles
                </p>
            </header>

            {/* 
        We wrap BookList in Suspense to show a loading state while
        the component is being loaded. This is particularly important
        for server components and data fetching
      */}
            <Suspense fallback={<LoadingSpinner />}>
                <BookList />
            </Suspense>
        </div>
    );
}