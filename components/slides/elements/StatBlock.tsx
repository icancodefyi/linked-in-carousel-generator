import { layoutConfig } from '@/lib/layout-config';

interface StatBlockProps {
  value: string;
  label?: string;
}

export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
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
        {value}
      </div>
      {label && (
        <div
          style={{
            fontFamily: layoutConfig.fonts.all,
            fontSize: '24px',
            fontWeight: 500,
            color: layoutConfig.colors.textMuted,
            maxWidth: `${layoutConfig.blockMaxWidth}px`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
