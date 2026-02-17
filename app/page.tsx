'use client';

import { useState, useRef } from 'react';
import { HookSlide } from '@/components/slides/HookSlide';
import { HeadlineWithBlocksSlide } from '@/components/slides/HeadlineWithBlocksSlide';
import JSONInput from '@/components/JSONInput';
import DownloadButton from '@/components/DownloadButton';

interface SlideData {
  type: 'hook' | 'headlineWithBlocks';
  lines?: string[];
  headline?: string;
  blocks?: string[];
  closing?: string;
}

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

export default function Page() {
  const [slides, setSlides] = useState<SlideData[]>([
    {
      type: 'hook',
      lines: ['YOU CANNOT', 'CALL THIS', 'EVIDENCE'],
    },
    {
      type: 'headlineWithBlocks',
      headline: 'Most AI detection tools only provide a probability score.',
      blocks: ['87% REAL', '92% FAKE'],
      closing: 'That is not evidence.',
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Zaid Rakhange',
    handle: '@zaidrakhange',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B9EXGspdelfTE05N9ZgHdVflQPMsoJ.png',
  });
  const slideRef = useRef<HTMLDivElement | null>(null);

  const handleJSONChange = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setSlides(parsed);
        setCurrentSlideIndex(0);
      } else {
        setSlides([parsed]);
        setCurrentSlideIndex(0);
      }
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', padding: '32px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937', marginBottom: '40px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
          Brand Locked Carousel Generator
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Left: JSON Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '12px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>JSON Input</h2>
              <JSONInput onJSONChange={handleJSONChange} />
            </div>

            {/* User Profile Config */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>User Profile</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '6px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Handle (@username)"
                  value={userProfile.handle}
                  onChange={(e) => setUserProfile({ ...userProfile, handle: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '6px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={userProfile.image}
                  onChange={(e) => setUserProfile({ ...userProfile, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Right: Slide Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '600px', height: '750px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              {currentSlide ? (
                <div style={{ width: '1200px', height: '1500px', transform: 'scale(0.5)', transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                  <div ref={slideRef} style={{ width: '1200px', height: '1500px' }}>
                    {currentSlide.type === 'hook' && (
                      <HookSlide lines={currentSlide.lines || []} userProfile={userProfile} slideNumber={currentSlideIndex + 1} totalSlides={totalSlides} />
                    )}
                    {currentSlide.type === 'headlineWithBlocks' && (
                      <HeadlineWithBlocksSlide
                        headline={currentSlide.headline || ''}
                        blocks={currentSlide.blocks || []}
                        closing={currentSlide.closing || ''}
                        userProfile={userProfile}
                        slideNumber={currentSlideIndex + 1}
                        totalSlides={totalSlides}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#9CA3AF', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <p style={{ fontSize: '18px', fontWeight: '600' }}>No slides yet</p>
                  <p style={{ fontSize: '14px' }}>Paste JSON to create slides</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            {totalSlides > 0 && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: currentSlideIndex === 0 ? '#E5E7EB' : '#10348C',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >
                  ← Previous
                </button>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif', minWidth: '60px', textAlign: 'center' }}>
                  {currentSlideIndex + 1} / {totalSlides}
                </span>
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === totalSlides - 1}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: currentSlideIndex === totalSlides - 1 ? '#E5E7EB' : '#10348C',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: currentSlideIndex === totalSlides - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Download Button */}
            {currentSlide && (
              <DownloadButton slideRef={slideRef} slideNumber={currentSlideIndex + 1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
