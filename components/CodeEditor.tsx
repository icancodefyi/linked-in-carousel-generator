import { useState, useEffect } from 'react';

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  initialCode?: string;
}

const DEFAULT_CODE = `<div class="flex flex-col gap-8 items-start">
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    YOU CANNOT
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    CALL THIS
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    EVIDENCE
  </div>
</div>`;

export default function CodeEditor({ onCodeChange, initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);

  // Sync internal state when initialCode prop changes (e.g., when template is selected)
  useEffect(() => {
    if (initialCode !== undefined) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCode(value);
    onCodeChange(value);
  };

  const quickInserts = [
    { label: 'Hero Block', code: '<div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">\n  YOUR TEXT\n</div>' },
    { label: 'Headline', code: '<h2 class="text-[62px] font-black text-gray-900 leading-tight">\n  Your Headline\n</h2>' },
    { label: 'Body Text', code: '<p class="text-[36px] font-semibold text-gray-900 leading-snug">\n  Your paragraph text here.\n</p>' },
    { label: 'Stat Box', code: '<div class="bg-[#10348C] text-white text-[85px] font-black px-20 py-11 tracking-tight leading-none text-center">\n  95%\n</div>' },
  ];

  const insertSnippet = (snippet: string) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '\n' + snippet + '\n' + code.substring(end);
      setCode(newCode);
      onCodeChange(newCode);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Quick Insert Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {quickInserts.map((insert, idx) => (
          <button
            key={idx}
            onClick={() => insertSnippet(insert.code)}
            style={{
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: '#F3F4F6',
              color: '#374151',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
          >
            + {insert.label}
          </button>
        ))}
      </div>

      <textarea
        value={code}
        onChange={handleChange}
        placeholder="Write your custom HTML/Tailwind code here..."
        spellCheck={false}
        style={{
          width: '100%',
          height: '450px',
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
        <strong style={{ color: '#374151', fontSize: '12px' }}>Pro Tip:</strong> Use font-black (not bold), leading-tight/none, and text-[90px] for hero blocks • text-[62px] for headlines • text-[36px] for body
      </div>
    </div>
  );
}
