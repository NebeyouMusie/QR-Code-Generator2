import { useState } from 'react';
import QRCode from 'qrcode';
import { saveToHistory } from '@/utils/storage';
import { Share2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface QRGeneratorProps {
  url: string;
  onReset: () => void;
}

const QRGenerator = ({ url, onReset }: QRGeneratorProps) => {
  const [qrCode, setQrCode] = useState<string>('');

  const generateQR = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#4F46E5',
          light: '#FFFFFF',
        },
      });
      
      setQrCode(qrDataUrl);
      saveToHistory({
        id: Date.now().toString(),
        url,
        createdAt: new Date().toISOString(),
        qrCode: qrDataUrl,
      });
    } catch (err) {
      toast.error("Failed to generate QR code");
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
    toast.success("QR code downloaded successfully!");
  };

  const handleShare = async () => {
    try {
      if (!navigator.share) {
        await navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard since sharing is not supported!");
        return;
      }

      const blob = await (await fetch(qrCode)).blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'QR Code',
        text: 'Check out this QR code!',
        url: url,
        files: [file]
      }).catch((error) => {
        // If file sharing fails, try sharing just the URL
        if (error.name === 'NotAllowedError') {
          return navigator.share({
            title: 'QR Code',
            text: 'Check out this QR code!',
            url: url
          });
        }
        throw error;
      });
      
      toast.success("QR code shared successfully!");
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          // User cancelled the share, don't show error toast
          return;
        }
      }
      // Fallback to clipboard
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    }
  };

  // Generate QR code on mount
  useState(() => {
    generateQR();
  });

  return (
    <div className="qr-container animate-fadeIn dark:bg-gray-800 dark:from-gray-800 dark:to-gray-900">
      {qrCode && (
        <>
          <img
            src={qrCode}
            alt="Generated QR Code"
            className="mx-auto mb-6 rounded-lg shadow-md animate-scaleIn"
          />
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download size={20} />
              Download
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
          <button
            onClick={onReset}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Generate another QR code
          </button>
        </>
      )}
    </div>
  );
};

export default QRGenerator;