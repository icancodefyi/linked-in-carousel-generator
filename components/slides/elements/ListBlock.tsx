import { layoutConfig } from '@/lib/layout-config';

interface ListBlockProps {
  items: string[];
  ordered?: boolean;
}

export function ListBlock({ items, ordered = false }: ListBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '16px',
            fontFamily: layoutConfig.fonts.all,
            fontSize: '32px',
            fontWeight: 500,
            color: layoutConfig.colors.textDark,
            lineHeight: 1.4,
            maxWidth: `${layoutConfig.contentWidth}px`,
          }}
        >
          <span
            style={{
              color: layoutConfig.colors.blueBlock,
              fontWeight: 700,
              minWidth: ordered ? '40px' : '24px',
            }}
          >
            {ordered ? `${index + 1}.` : '•'}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
