import SlideLayout from './SlideLayout';
import { layoutConfig } from '@/lib/layout-config';

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

interface HookSlideProps {
  lines: string[];
  userProfile: UserProfile;
  slideNumber: number;
  totalSlides: number;
}

export function HookSlide({
  lines,
  userProfile,
  slideNumber,
  totalSlides,
}: HookSlideProps) {
  return (
    <SlideLayout
      userProfile={userProfile}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              backgroundColor: layoutConfig.colors.blueBlock,
              color: '#FFFFFF',
              fontFamily: layoutConfig.fonts.all,
              fontSize: `${layoutConfig.typography.hookBlock}px`,
              fontWeight: 800,
              lineHeight: 1.05,
              padding: '32px 48px',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              display: 'inline-block',
              wordWrap: 'break-word',
              maxWidth: `${layoutConfig.contentWidth}px`,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
