'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBooks } from '@/lib/api';
import type { Book } from '@/lib/types';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

export default function BookList() {
    // State management
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Optional search state
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all books when component mounts
    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                setError('Failed to load books. Please try again.');
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []); // Empty dependency array means this runs once on mount

    // Filter books based on search term if one is provided
    const displayedBooks = searchTerm.trim()
        ? books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : books;

    return (
        <div>
            {/* Header section with search and add book button */}
            <div className="flex justify-between items-center mb-6">
                {/* Optional search input */}
                <div className="flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search in displayed books... (optional)"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading state */}
            {loading && <LoadingSpinner />}

            {/* Error state */}
            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Books grid */}
            {!loading && !error && (
                <>
                    {/* Show total books count */}
                    <p className="text-gray-600 mb-4">
                        Showing {displayedBooks.length} {displayedBooks.length === 1 ? 'book' : 'books'}
                        {searchTerm && ` (filtered from ${books.length} total)`}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedBooks.length > 0 ? (
                            displayedBooks.map(book => (
                                <BookCard key={book.id} book={book} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                {searchTerm
                                    ? 'No books match your search. Try different keywords.'
                                    : 'No books available. Add some books to get started.'}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}