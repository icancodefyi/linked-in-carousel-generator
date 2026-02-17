'use client';

import { useState, useRef } from 'react';
import { CustomSlide } from '@/components/slides/CustomSlide';
import CodeEditor from '@/components/CodeEditor';
import DownloadButton from '@/components/DownloadButton';
import TemplateSelector from '@/components/TemplateSelector';
import AIDesignChat from '@/components/AIDesignChat';

interface SlideData {
  htmlCode: string;
}

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

export default function Page() {
  const [slides, setSlides] = useState<SlideData[]>([
    {
      htmlCode: `<div class="flex flex-col gap-8 items-start">
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    YOU CANNOT
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    CALL THIS
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    EVIDENCE
  </div>
</div>`,
    },
    {
      htmlCode: `<div class="flex flex-col gap-12">
  <h2 class="text-[62px] font-black text-gray-900 leading-tight">
    Most AI detection tools<br/>only provide<br/>a probability score.
  </h2>
  
  <div class="flex flex-col gap-7 w-full">
    <div class="bg-[#10348C] text-white text-[85px] font-black px-20 py-11 tracking-tight leading-none text-center">
      87% REAL
    </div>
    <div class="bg-[#10348C] text-white text-[85px] font-black px-20 py-11 tracking-tight leading-none text-center">
      92% FAKE
    </div>
  </div>
  
  <p class="text-[48px] font-bold text-gray-900 leading-tight">
    That is not evidence.
  </p>
</div>`
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentCode, setCurrentCode] = useState(slides[0].htmlCode);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Zaid Rakhange',
    handle: '@zaidrakhange',
    image: 'https://zaid.impiclabs.com/_next/image?url=%2Fassets%2Flogo.png&w=96&q=75',
  });
  const slideRef = useRef<HTMLDivElement | null>(null);

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
    // Update the current slide with the new code
    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex] = { htmlCode: code };
    setSlides(updatedSlides);
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      setCurrentCode(slides[nextIndex].htmlCode);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      const prevIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIndex);
      setCurrentCode(slides[prevIndex].htmlCode);
    }
  };

  const handleAddSlide = () => {
    const newSlide: SlideData = {
      htmlCode: `<div class="flex flex-col gap-12">
  <h2 class="text-[62px] font-black text-gray-900 leading-tight">
    New Slide
  </h2>
  <p class="text-[36px] font-semibold text-gray-700 leading-snug">
    Start creating amazing content...
  </p>
</div>`,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    setCurrentCode(newSlide.htmlCode);
  };

  const handleDeleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, index) => index !== currentSlideIndex);
      setSlides(newSlides);
      const newIndex = Math.min(currentSlideIndex, newSlides.length - 1);
      setCurrentSlideIndex(newIndex);
      setCurrentCode(newSlides[newIndex].htmlCode);
    }
  };

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', padding: '32px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
            LinkedIn Carousel Generator
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
            Create stunning carousel posts with professional templates and custom styling. Code with Tailwind, preview instantly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Left: Code Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '12px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>🎨 Code Editor</h2>
              <CodeEditor onCodeChange={handleCodeChange} initialCode={currentCode} key={currentSlideIndex} />
            </div>

            {/* Template Selector */}
            <TemplateSelector onSelectTemplate={(template) => {
              setCurrentCode(template);
              handleCodeChange(template);
            }} />

            {/* AI Design Chat */}
            <AIDesignChat 
              onDesignGenerated={(code) => {
                const newSlide: SlideData = { htmlCode: code };
                const newSlides = [...slides, newSlide];
                setSlides(newSlides);
                setCurrentSlideIndex(newSlides.length - 1);
                setCurrentCode(code);
              }}
              onAddSlide={() => {
                // Chat will trigger the generation, we handle it above
              }}
            />

            {/* Slide Management */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>🎬 Slide Management</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddSlide}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: '#10348C',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D2B70'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10348C'}
                >
                  + Add New Slide
                </button>
                <button
                  onClick={handleDeleteSlide}
                  disabled={slides.length === 1}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    backgroundColor: slides.length === 1 ? '#E5E7EB' : '#DC2626',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: slides.length === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (slides.length > 1) e.currentTarget.style.backgroundColor = '#B91C1C';
                  }}
                  onMouseLeave={(e) => {
                    if (slides.length > 1) e.currentTarget.style.backgroundColor = '#DC2626';
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            {/* User Profile Config */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>👤 Profile Settings</h3>
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
                  placeholder="Profile Image URL"
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
                    <CustomSlide
                      htmlCode={currentSlide.htmlCode}
                      userProfile={userProfile}
                      slideNumber={currentSlideIndex + 1}
                      totalSlides={totalSlides}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ color: '#9CA3AF', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <p style={{ fontSize: '18px', fontWeight: '600' }}>No slides yet</p>
                  <p style={{ fontSize: '14px' }}>Write code to create slides</p>
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
