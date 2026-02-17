import { useState } from 'react';
import { generateDesignWithAI } from '@/lib/ai-service';

interface AIChatProps {
  onDesignGenerated: (code: string) => void;
  onAddSlide?: () => void;
}

export default function AIDesignChat({ onDesignGenerated, onAddSlide }: AIChatProps) {
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await generateDesignWithAI(userMessage);
      
      onDesignGenerated(response.customCode);
      if (onAddSlide) {
        onAddSlide();
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `✨ Custom design created!\n\n${response.explanation}`,
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Failed to generate design. Make sure GROQ_API_KEY is set.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setShowChat(!showChat)}
      >
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1F2937',
            fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
          }}
        >
          🤖 AI Design Assistant
        </h3>
        <span
          style={{
            fontSize: '12px',
            color: '#6B7280',
            fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
          }}
        >
          {showChat ? '▼' : '▶'}
        </span>
      </div>

      {showChat && (
        <>
          {/* Chat Messages */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              maxHeight: '300px',
              overflowY: 'auto',
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
            }}
          >
            {messages.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                👋 Describe your carousel design and I'll create it for you!
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: msg.role === 'user' ? '#10348C' : '#E5E7EB',
                    color: msg.role === 'user' ? '#FFFFFF' : '#1F2937',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    fontWeight: msg.role === 'assistant' ? '500' : '400',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your carousel design..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 12px',
                fontSize: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                outline: 'none',
                opacity: loading ? 0.6 : 1,
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: '10px 16px',
                backgroundColor: loading || !input.trim() ? '#E5E7EB' : '#10348C',
                color: '#FFFFFF',
                borderRadius: '6px',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.backgroundColor = '#0D2B70';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.backgroundColor = '#10348C';
                }
              }}
            >
              {loading ? '⏳' : '✨ Generate'}
            </button>
          </form>

          <p style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '8px', margin: '8px 0 0 0', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
            💡 Try: "Create a stats carousel about AI" or "Make an eye-catching hero slide"
          </p>
        </>
      )}
    </div>
  );
}
