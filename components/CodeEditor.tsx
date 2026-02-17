import { useState } from 'react';

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  initialCode?: string;
}

const DEFAULT_CODE = `<!-- FIXED TEXT SIZE HIERARCHY - USE THESE SIZES ONLY:
  - Hero/Main (blue blocks): text-[80px] leading-[1.1]
  - Headline: text-[56px] leading-[1.2] 
  - Subheadline: text-[40px] leading-[1.3]
  - Body Large: text-[32px] leading-[1.4]
  - Body: text-[24px] leading-[1.5]
  - Caption: text-[20px] leading-[1.5]
-->

<div class="flex flex-col gap-8 items-start">
  <div class="bg-[#10348C] text-white text-[80px] font-bold px-12 py-10 tracking-tight leading-[1.1]">
    YOU CANNOT
  </div>
  <div class="bg-[#10348C] text-white text-[80px] font-bold px-12 py-10 tracking-tight leading-[1.1]">
    CALL THIS
  </div>
  <div class="bg-[#10348C] text-white text-[80px] font-bold px-12 py-10 tracking-tight leading-[1.1]">
    EVIDENCE
  </div>
</div>`;

export default function CodeEditor({ onCodeChange, initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCode(value);
    onCodeChange(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <textarea
        value={code}
        onChange={handleChange}
        placeholder="Write your custom HTML/Tailwind code here..."
        spellCheck={false}
        style={{
          width: '100%',
          height: '500px',
          padding: '16px',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '13px',
          resize: 'vertical',
          outline: 'none',
          backgroundColor: '#1E1E1E',
          color: '#D4D4D4',
          lineHeight: '1.6',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          tabSize: 2,
        }}
      />
      <div style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif', lineHeight: '1.5' }}>
        <strong style={{ color: '#374151', fontSize: '12px' }}>Fixed Text Sizes:</strong> Hero: text-[80px] • Headline: text-[56px] • Subhead: text-[40px] • Large: text-[32px] • Body: text-[24px] • Caption: text-[20px]
      </div>
    </div>
  );
}
