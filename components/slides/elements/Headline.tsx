import { layoutConfig } from '@/lib/layout-config';

interface HeadlineProps {
  text: string;
}

export function Headline({ text }: HeadlineProps) {
  return (
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
      {text}
    </div>
  );
}
