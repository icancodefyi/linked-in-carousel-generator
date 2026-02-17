'use client';

import { useEffect, useState } from 'react';

interface DownloadButtonProps {
  slideRef: React.RefObject<HTMLDivElement | null>;
  slideNumber: number;
}

declare global {
  interface Window {
    html2canvas?: any;
  }
}

export default function DownloadButton({ slideRef, slideNumber }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkLibrary = async () => {
      try {
        if (typeof window !== 'undefined' && !window.html2canvas) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          script.async = true;
          script.onload = () => {
            setIsReady(true);
          };
          script.onerror = () => {
            console.error('Failed to load html2canvas');
            setIsReady(true);
          };
          document.head.appendChild(script);
        } else {
          setIsReady(true);
        }
      } catch (error) {
        console.error('Failed to load html2canvas:', error);
        setIsReady(true);
      }
    };

    checkLibrary();
  }, []);

  const handleDownload = async () => {
    if (!slideRef.current) {
      alert('Slide not found');
      return;
    }

    if (!window.html2canvas) {
      alert('Download library not loaded. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    try {
      const canvas = await window.html2canvas(slideRef.current, {
        width: 1200,
        height: 1500,
        scale: 1,
        backgroundColor: '#FFFFFF',
        logging: false,
        useCORS: true,
        allowTaint: false,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `slide-${slideNumber}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to download slide:', error);
      alert('Failed to download slide. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading || !isReady}
      style={{
        padding: '12px 32px',
        backgroundColor: isLoading || !isReady ? '#E5E7EB' : '#10348C',
        color: '#FFFFFF',
        borderRadius: '6px',
        border: 'none',
        cursor: isLoading || !isReady ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
        boxShadow: isLoading || !isReady ? 'none' : '0 2px 4px rgba(16, 52, 140, 0.2)',
        transition: 'all 0.2s',
      }}
    >
      {isLoading ? 'Downloading...' : isReady ? 'Download PNG' : 'Loading...'}
    </button>
  );
}
