import GridOverlay from './GridOverlay';
import { layoutConfig } from '@/lib/layout-config';
import { useState } from 'react';

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

interface SlideLayoutProps {
  children: React.ReactNode;
  userProfile: UserProfile;
  slideNumber: number;
  totalSlides: number;
}

export default function SlideLayout({
  children,
  userProfile,
  slideNumber,
  totalSlides,
}: SlideLayoutProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id="slide"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: `${layoutConfig.slideWidth}px`,
        height: `${layoutConfig.slideHeight}px`,
        backgroundColor: layoutConfig.colors.background,
      }}
    >
      <GridOverlay />

      {/* Content Area */}
      <div
        style={{
          paddingLeft: `${layoutConfig.leftPadding}px`,
          paddingTop: `${layoutConfig.topPadding}px`,
          paddingRight: `${layoutConfig.rightPadding}px`,
          flex: 1,
        }}
      >
        {children}
      </div>

      {/* Footer Area */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: `${layoutConfig.leftPadding}px`,
          paddingRight: `${layoutConfig.rightPadding}px`,
          paddingBottom: `${layoutConfig.bottomPadding}px`,
          borderTop: '1px solid rgba(229, 231, 235, 0.3)',
          paddingTop: '48px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Left: User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!imageError ? (
            <img
              src={userProfile.image}
              alt={userProfile.name}
              onError={() => setImageError(true)}
              crossOrigin="anonymous"
              style={{
                width: `${layoutConfig.typography.footerImage}px`,
                height: `${layoutConfig.typography.footerImage}px`,
                borderRadius: '50%',
                objectFit: 'cover',
                backgroundColor: '#1E40AF',
                border: '2px solid #1E40AF',
              }}
            />
          ) : (
            <div
              style={{
                width: `${layoutConfig.typography.footerImage}px`,
                height: `${layoutConfig.typography.footerImage}px`,
                borderRadius: '50%',
                backgroundColor: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {userProfile.name.charAt(0)}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: layoutConfig.fonts.all,
                fontSize: `${layoutConfig.typography.footerName}px`,
                fontWeight: 600,
                color: layoutConfig.colors.textDark,
              }}
            >
              {userProfile.name}
            </div>
            <div
              style={{
                fontFamily: layoutConfig.fonts.all,
                fontSize: `${layoutConfig.typography.footerHandle}px`,
                fontWeight: 400,
                color: layoutConfig.colors.textMuted,
              }}
            >
              {userProfile.handle}
            </div>
          </div>
        </div>

        {/* Right: Page Number & Arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontFamily: layoutConfig.fonts.all,
              fontSize: `${layoutConfig.typography.pageNumber}px`,
              fontWeight: 500,
              color: layoutConfig.colors.textMuted,
            }}
          >
            {slideNumber} / {totalSlides}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: layoutConfig.colors.blueBlock,
              fontWeight: 'bold',
            }}
          >
            →
          </div>
        </div>
      </footer>
    </div>
  );
}
