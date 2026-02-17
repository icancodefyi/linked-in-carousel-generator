interface SpacerProps {
  size?: 'small' | 'medium' | 'large';
}

export function Spacer({ size = 'medium' }: SpacerProps) {
  const heights = {
    small: 16,
    medium: 32,
    large: 64,
  };

  return <div style={{ height: `${heights[size]}px` }} />;
}
