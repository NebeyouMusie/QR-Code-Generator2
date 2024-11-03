import { useState } from 'react';
import URLInput from '@/components/URLInput';
import QRGenerator from '@/components/QRGenerator';
import RecentQRCodes from '@/components/RecentQRCodes';
import { getHistory, QRCodeHistory } from '@/utils/storage';
import { checkUrlReachability } from '@/utils/validation';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<QRCodeHistory[]>(getHistory());

  const handleSubmit = async (inputUrl: string) => {
    setIsLoading(true);
    try {
      const isReachable = await checkUrlReachability(inputUrl);
      if (!isReachable) {
        toast.error("This URL appears to be unreachable");
        return;
      }
      setUrl(inputUrl);
    } catch (error) {
      toast.error("Failed to validate URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setHistory(getHistory());
  };

  const handleHistorySelect = (item: QRCodeHistory) => {
    setUrl(item.url);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generate QR codes instantly for any URL
          </p>
        </div>

        {!url ? (
          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <QRGenerator url={url} onReset={handleReset} />
        )}

        <RecentQRCodes history={history} onSelect={handleHistorySelect} />
      </div>
    </div>
  );
};

export default Index;