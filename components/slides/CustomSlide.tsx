import SlideLayout from './SlideLayout';
import { layoutConfig } from '@/lib/layout-config';

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

interface CustomSlideProps {
  htmlCode: string;
  userProfile: UserProfile;
  slideNumber: number;
  totalSlides: number;
}

export function CustomSlide({
  htmlCode,
  userProfile,
  slideNumber,
  totalSlides,
}: CustomSlideProps) {
  return (
    <SlideLayout
      userProfile={userProfile}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: htmlCode }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${layoutConfig.verticalSpacing}px`,
        }}
      />
    </SlideLayout>
  );
}
