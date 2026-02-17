export default function ElementReference() {
  return (
    <div style={{ 
      backgroundColor: '#FFFFFF', 
      padding: '20px', 
      borderRadius: '12px', 
      border: '1px solid #E5E7EB',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ 
        fontSize: '14px', 
        fontWeight: '600', 
        color: '#1F2937', 
        marginBottom: '16px', 
        fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' 
      }}>
        Available Elements
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '8px',
        fontSize: '12px',
        fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif'
      }}>
        <ElementTag name="headline" />
        <ElementTag name="blueBlock" />
        <ElementTag name="paragraph" />
        <ElementTag name="statBlock" />
        <ElementTag name="list" />
        <ElementTag name="quote" />
        <ElementTag name="divider" />
        <ElementTag name="spacer" />
      </div>
      <a 
        href="https://github.com/yourusername/linked-in-carousel-generator/blob/main/COMPOSITION_GUIDE.md"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          marginTop: '12px',
          fontSize: '12px',
          color: '#10348C',
          textDecoration: 'none',
          fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
          fontWeight: 500
        }}
      >
        View full composition guide →
      </a>
    </div>
  );
}

function ElementTag({ name }: { name: string }) {
  return (
    <div style={{
      padding: '6px 10px',
      backgroundColor: '#F3F4F6',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: 500,
      color: '#374151',
      fontFamily: 'Monaco, Consolas, monospace',
      textAlign: 'center'
    }}>
      {name}
    </div>
  );
}
