export default function GridOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 99px,
            #E5E7EB 99px,
            #E5E7EB 100px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 99px,
            #E5E7EB 99px,
            #E5E7EB 100px
          )
        `,
        opacity: 0.35,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
