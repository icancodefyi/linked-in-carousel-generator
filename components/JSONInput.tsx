import { useState } from 'react';

interface JSONInputProps {
  onJSONChange: (json: string) => void;
}

const EXAMPLE_JSON = `[
  {
    "type": "hook",
    "lines": ["YOU CANNOT", "CALL THIS", "EVIDENCE"]
  },
  {
    "type": "headlineWithBlocks",
    "headline": "Most AI detection tools only provide a probability score.",
    "blocks": ["87% REAL", "92% FAKE"],
    "closing": "That is not evidence."
  }
]`;

export default function JSONInput({ onJSONChange }: JSONInputProps) {
  const [json, setJson] = useState(EXAMPLE_JSON);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJson(value);
    onJSONChange(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <textarea
        value={json}
        onChange={handleChange}
        placeholder="Paste your JSON here..."
        style={{
          width: '100%',
          height: '384px',
          padding: '16px',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '13px',
          resize: 'none',
          outline: 'none',
          backgroundColor: '#FFFFFF',
          lineHeight: '1.6',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      />
      <p style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
        Paste JSON array or object to generate slides. Changes render instantly.
      </p>
    </div>
  );
}
