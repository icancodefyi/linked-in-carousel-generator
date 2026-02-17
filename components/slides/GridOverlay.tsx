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
            #F3F4F6 99px,
            #F3F4F6 100px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 99px,
            #F3F4F6 99px,
            #F3F4F6 100px
          )
        `,
        opacity: 0.02,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
