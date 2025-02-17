# Library Management System Frontend

This is the frontend application for a Library Management System, built using Next.js 13+ with TypeScript. The application provides a basic interface for viewing and managing books in a library collection, with features like book listings, details viewing, and AI-powered insights.

## Current State and Scope

This application is currently in its initial development phase, focusing on core functionality rather than extensive styling or advanced features. It serves as a foundation that can be expanded upon in future iterations.

The current implementation prioritizes functionality and proper component structure over sophisticated styling. While the application uses Tailwind CSS for basic styling, the visual design is intentionally kept simple to allow for future enhancement.

## Features

The application currently includes these core features:

### Book Listing
Users can view all books in the library collection displayed as cards. Each card shows essential information including the book's title, author, publication year, and a brief description.

### Book Details
Rather than navigating to separate pages, book details are displayed in a modal/popup when users click on a book. This creates a smoother user experience by keeping users on the same page while viewing detailed information.

### Search Functionality
The current search implementation uses client-side filtering of the displayed books. This approach was chosen given the current scope and scale of the application. For larger datasets, this could be updated to use server-side search in future iterations.

### AI Insights
Each book can display AI-generated insights, providing unique perspectives or analysis about the book. These insights are fetched from the backend API.

## Technical Implementation

### API Communication
The application communicates with a Spring Boot backend running on port 8080. All API calls are centralized in the api.ts file for better maintainability.

### State Management
The application uses React's built-in state management with useState and useEffect hooks, which is sufficient for the current scope. This could be expanded to use more robust state management solutions if needed in the future.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- The backend server running on localhost:8080

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd library-management-frontend
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```
