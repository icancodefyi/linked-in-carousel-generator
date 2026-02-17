import { layoutConfig } from '@/lib/layout-config';

interface DividerProps {
  thickness?: 'thin' | 'medium' | 'thick';
}

export function Divider({ thickness = 'thin' }: DividerProps) {
  const heights = {
    thin: 2,
    medium: 4,
    thick: 6,
  };

  return (
    <div
      style={{
        width: '120px',
        height: `${heights[thickness]}px`,
        backgroundColor: layoutConfig.colors.blueBlock,
      }}
    />
  );
}
