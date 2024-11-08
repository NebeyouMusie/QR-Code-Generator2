import { useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface QRGeneratorProps {
  url: string;
  onReset: () => void;
}

const QRGenerator = ({ url, onReset }: QRGeneratorProps) => {
  const [qrCode, setQrCode] = useState<string>('');

  const generateQR = async () => {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#4F46E5',
        light: '#FFFFFF',
      },
    });
    setQrCode(qrDataUrl);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCode;
    link.click();
    toast.success("QR code downloaded successfully!");
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