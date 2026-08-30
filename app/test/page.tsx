'use client';

import { Footer } from './Footer';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Test Page</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          This page demonstrates the footer component with Block and Safari components.
        </p>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-neutral-700 dark:text-neutral-300">
            The footer below uses two main components:
          </p>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300 space-y-2">
            <li>
              <strong>Block:</strong> A simple rectangular container with border and shadow styling
            </li>
            <li>
              <strong>Safari:</strong> A browser-like UI component mimicking Safari interface
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
