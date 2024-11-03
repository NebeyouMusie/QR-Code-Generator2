import { QRCodeHistory } from '@/utils/storage';

interface RecentQRCodesProps {
  history: QRCodeHistory[];
  onSelect: (item: QRCodeHistory) => void;
}

const RecentQRCodes = ({ history, onSelect }: RecentQRCodesProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Recent QR Codes</h2>
      <div className="recent-qr-grid">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={item.qrCode}
              alt={`QR Code for ${item.url}`}
              className="w-full h-auto"
            />
            <p className="mt-2 text-sm text-gray-600 truncate">{item.url}</p>
            <p className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQRCodes;