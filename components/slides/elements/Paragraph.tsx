import { layoutConfig } from '@/lib/layout-config';

interface ParagraphProps {
  text: string;
  size?: 'normal' | 'large';
}

export function Paragraph({ text, size = 'normal' }: ParagraphProps) {
  const fontSize = size === 'large' ? layoutConfig.typography.closingLine : 28;

  return (
    <div
      style={{
        fontFamily: layoutConfig.fonts.all,
        fontSize: `${fontSize}px`,
        fontWeight: 500,
        color: layoutConfig.colors.textDark,
        lineHeight: 1.4,
        maxWidth: `${layoutConfig.contentWidth}px`,
      }}
    >
      {text}
    </div>
  );
}
