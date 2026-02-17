import { layoutConfig } from '@/lib/layout-config';

interface BlueBlockProps {
  text: string;
  size?: 'large' | 'medium';
}

export function BlueBlock({ text, size = 'large' }: BlueBlockProps) {
  const fontSize = size === 'large' 
    ? layoutConfig.typography.hookBlock 
    : layoutConfig.typography.secondaryBlocks;

  return (
    <div
      style={{
        backgroundColor: layoutConfig.colors.blueBlock,
        color: '#FFFFFF',
        fontFamily: layoutConfig.fonts.all,
        fontSize: `${fontSize}px`,
        fontWeight: 800,
        lineHeight: 1.05,
        padding: size === 'large' ? '32px 48px' : '20px 48px',
        textTransform: 'uppercase',
        letterSpacing: size === 'large' ? '0.02em' : '0.01em',
        display: 'inline-block',
        wordWrap: 'break-word',
        maxWidth: `${layoutConfig.blockMaxWidth}px`,
      }}
    >
      {text}
    </div>
  );
}
