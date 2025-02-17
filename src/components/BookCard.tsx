'use client';

import { useState } from 'react';
import type { Book } from '@/lib/types';
import AIInsights from './AIInsights';

interface BookCardProps {
    book: Book;
    showActions?: boolean;
}

export default function BookCard({ book, showActions = true }: BookCardProps) {
    // State for controlling modal visibility and insights
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showInsights, setShowInsights] = useState(false);

    return (
        <>
            {/* Book Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                {/* Book Title - Made clickable */}
                <h2
                    onClick={() => setIsModalOpen(true)}
                    className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 cursor-pointer"
                >
                    {book.title}
                </h2>

                {/* Book Metadata */}
                <div className="mb-4">
                    <p className="text-gray-600">By {book.author}</p>
                    <p className="text-gray-500">Published in {book.publicationYear}</p>
                </div>

                {/* Book Description Preview */}
                <p className="text-gray-700 mb-4 line-clamp-3">
                    {book.description}
                </p>

                {/* Action Buttons */}
                {showActions && (
                    <div className="flex gap-4 mt-auto">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
                        >
                            View Details
                        </button>

                        <button
                            onClick={() => setShowInsights(!showInsights)}
                            className="text-purple-500 hover:text-purple-600 transition-colors"
                        >
                            {showInsights ? 'Hide AI Insights' : 'Show AI Insights'}
                        </button>
                    </div>
                )}

                {/* AI Insights Panel */}
                {showInsights && book.id && (
                    <div className="mt-4">
                        <AIInsights bookId={book.id} />
                    </div>
                )}
            </div>

            {/* Modal/Popup for Book Details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-6 py-4">
                            {/* Detailed Metadata */}
                            <div className="mb-6">
                                <p className="text-lg text-gray-600 mb-2">By {book.author}</p>
                                <p className="text-gray-500">Published in {book.publicationYear}</p>
                                {book.isbn && (
                                    <p className="text-gray-500">ISBN: {book.isbn}</p>
                                )}
                            </div>

                            {/* Full Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {book.description}
                                </p>
                            </div>

                            {/* AI Insights in Modal */}
                            {book.id && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
                                    <AIInsights bookId={book.id} />
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t px-6 py-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}