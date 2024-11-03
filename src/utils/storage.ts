export interface QRCodeHistory {
  id: string;
  url: string;
  createdAt: string;
  qrCode: string;
}

export const saveToHistory = (qrCode: QRCodeHistory) => {
  const history = getHistory();
  const updatedHistory = [qrCode, ...history].slice(0, 6);
  localStorage.setItem('qr-history', JSON.stringify(updatedHistory));
};

export const getHistory = (): QRCodeHistory[] => {
  const history = localStorage.getItem('qr-history');
  return history ? JSON.parse(history) : [];
};