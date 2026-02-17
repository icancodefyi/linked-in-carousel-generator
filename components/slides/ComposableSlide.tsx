import SlideLayout from './SlideLayout';
import { Headline } from './elements/Headline';
import { BlueBlock } from './elements/BlueBlock';
import { Paragraph } from './elements/Paragraph';
import { StatBlock } from './elements/StatBlock';
import { ListBlock } from './elements/ListBlock';
import { QuoteBlock } from './elements/QuoteBlock';
import { Divider } from './elements/Divider';
import { Spacer } from './elements/Spacer';
import { layoutConfig } from '@/lib/layout-config';

interface UserProfile {
  name: string;
  handle: string;
  image: string;
}

interface SlideElement {
  type: 'headline' | 'blueBlock' | 'paragraph' | 'statBlock' | 'list' | 'quote' | 'divider' | 'spacer';
  text?: string;
  value?: string;
  label?: string;
  items?: string[];
  ordered?: boolean;
  author?: string;
  size?: 'small' | 'medium' | 'large' | 'normal';
  thickness?: 'thin' | 'medium' | 'thick';
}

interface ComposableSlideProps {
  elements: SlideElement[];
  userProfile: UserProfile;
  slideNumber: number;
  totalSlides: number;
}

export function ComposableSlide({
  elements,
  userProfile,
  slideNumber,
  totalSlides,
}: ComposableSlideProps) {
  const renderElement = (element: SlideElement, index: number) => {
    switch (element.type) {
      case 'headline':
        return <Headline key={index} text={element.text || ''} />;
      
      case 'blueBlock':
        return (
          <BlueBlock
            key={index}
            text={element.text || ''}
            size={element.size === 'medium' ? 'medium' : 'large'}
          />
        );
      
      case 'paragraph':
        return (
          <Paragraph
            key={index}
            text={element.text || ''}
            size={element.size === 'large' ? 'large' : 'normal'}
          />
        );
      
      case 'statBlock':
        return (
          <StatBlock
            key={index}
            value={element.value || element.text || ''}
            label={element.label}
          />
        );
      
      case 'list':
        return (
          <ListBlock
            key={index}
            items={element.items || []}
            ordered={element.ordered}
          />
        );
      
      case 'quote':
        return (
          <QuoteBlock
            key={index}
            text={element.text || ''}
            author={element.author}
          />
        );
      
      case 'divider':
        return (
          <Divider
            key={index}
            thickness={element.thickness}
          />
        );
      
      case 'spacer':
        return (
          <Spacer
            key={index}
            size={element.size as 'small' | 'medium' | 'large'}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <SlideLayout
      userProfile={userProfile}
      slideNumber={slideNumber}
      totalSlides={totalSlides}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${layoutConfig.verticalSpacing}px` }}>
        {elements.map((element, index) => renderElement(element, index))}
      </div>
    </SlideLayout>
  );
}
