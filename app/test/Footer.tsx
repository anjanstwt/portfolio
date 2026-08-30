import { Block } from './Block';
import { Safari } from './Safari';

export function Footer() {
  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Block>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">About</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                This is a test page showcasing the footer component built with Block and Safari components.
              </p>
            </div>
          </Block>

          <Safari title="Contact" url="example.com/contact">
            <div className="space-y-3">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Get in touch with us</p>
              <div className="space-y-2">
                <p className="text-xs text-neutral-500">Email: test@example.com</p>
                <p className="text-xs text-neutral-500">Phone: +1 (555) 000-0000</p>
              </div>
            </div>
          </Safari>
        </div>

        <Block className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Test Page. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </Block>
      </div>
    </footer>
  );
}
