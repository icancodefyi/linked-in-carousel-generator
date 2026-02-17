import { layoutConfig } from '@/lib/layout-config';

interface QuoteBlockProps {
  text: string;
  author?: string;
}

export function QuoteBlock({ text, author }: QuoteBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          borderLeft: `6px solid ${layoutConfig.colors.blueBlock}`,
          paddingLeft: '32px',
          fontFamily: layoutConfig.fonts.all,
          fontSize: '42px',
          fontWeight: 600,
          fontStyle: 'italic',
          color: layoutConfig.colors.textDark,
          lineHeight: 1.4,
          maxWidth: `${layoutConfig.contentWidth - 38}px`,
        }}
      >
        "{text}"
      </div>
      {author && (
        <div
          style={{
            paddingLeft: '38px',
            fontFamily: layoutConfig.fonts.all,
            fontSize: '24px',
            fontWeight: 500,
            color: layoutConfig.colors.textMuted,
          }}
        >
          — {author}
        </div>
      )}
    </div>
  );
}
