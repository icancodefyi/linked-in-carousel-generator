import SlideLayout from './SlideLayout';

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
        className="custom-slide-content"
      />
    </SlideLayout>
  );
}
