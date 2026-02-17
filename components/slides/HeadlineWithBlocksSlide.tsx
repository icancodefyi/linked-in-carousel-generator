import SlideLayout from './SlideLayout';
import { layoutConfig } from '@/lib/layout-config';

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

interface HeadlineWithBlocksSlideProp {
  headline: string;
  blocks: string[];
  closing: string;
  userProfile: UserProfile;
  slideNumber: number;
  totalSlides: number;
}

export function HeadlineWithBlocksSlide({
  headline,
  blocks,
  closing,
  userProfile,
  slideNumber,
  totalSlides,
}: HeadlineWithBlocksSlideProp) {
  return (
    <SlideLayout
      userProfile={userProfile}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutConfig.verticalSpacing}px` }}>
        {/* Headline */}
        <div
          style={{
            fontFamily: layoutConfig.fonts.all,
            fontSize: `${layoutConfig.typography.headline}px`,
            fontWeight: 600,
            color: layoutConfig.colors.textDark,
            lineHeight: 1.25,
            maxWidth: `${layoutConfig.contentWidth}px`,
          }}
        >
          {headline}
        </div>

        {/* Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
          {blocks.map((block, index) => (
            <div
              key={index}
              style={{
                backgroundColor: layoutConfig.colors.blueBlock,
                color: '#FFFFFF',
                fontFamily: layoutConfig.fonts.all,
                fontSize: `${layoutConfig.typography.secondaryBlocks}px`,
                fontWeight: 800,
                padding: '20px 48px',
                textTransform: 'uppercase',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                display: 'inline-block',
                maxWidth: `${layoutConfig.blockMaxWidth}px`,
              }}
            >
              {block}
            </div>
          ))}
        </div>

        {/* Closing */}
        <div
          style={{
            fontFamily: layoutConfig.fonts.all,
            fontSize: `${layoutConfig.typography.closingLine}px`,
            fontWeight: 500,
            color: layoutConfig.colors.textDark,
            marginTop: '72px',
            lineHeight: 1.4,
            maxWidth: `${layoutConfig.contentWidth}px`,
          }}
        >
          {closing}
        </div>
      </div>
    </SlideLayout>
  );
}
