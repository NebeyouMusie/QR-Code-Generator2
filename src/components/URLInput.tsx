import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { isValidUrl } from '@/utils/validation';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const URLInput = ({ onSubmit, isLoading }: URLInputProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="input-container animate-fadeIn">
      <Input
        type="url"
        placeholder="Enter your URL here (e.g., https://example.com)"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError('');
        }}
        className={`w-full px-4 py-3 text-lg rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
        disabled={isLoading}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-fadeIn">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
    </form>
  );
};

export default URLInput;