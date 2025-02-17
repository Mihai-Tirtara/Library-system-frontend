import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">
        Library Management System
      </h1>

      <p className="text-xl mb-8 text-gray-600">
        Welcome to our digital library. Browse our collection, search for books,
        and discover AI-powered insights about your favorite titles.
      </p>

      <div className="space-y-4">
        <Link
          href="/books"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Books
        </Link>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Extensive Collection"
            description="Browse through our carefully curated collection of books across various genres."
          />
          <FeatureCard
            title="AI Insights"
            description="Get unique, AI-generated insights about each book in our library."
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for feature cards
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}