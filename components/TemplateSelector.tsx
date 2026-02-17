import { templates, Template } from '@/lib/templates';

interface TemplateSelectorProps {
  onSelectTemplate: (code: string) => void;
}

export default function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const categories = ['hero', 'stats', 'list', 'terms', 'quote'] as const;
  
  const categoryLabels = {
    hero: '🎯 Hero',
    stats: '📊 Stats',
    list: '📝 Lists',
    terms: '🏷️ Terms',
    quote: '💬 Quotes'
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '16px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
        📚 Templates
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map(category => {
          const categoryTemplates = templates.filter(t => t.category === category);
          return (
            <div key={category}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
                {categoryLabels[category]}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {categoryTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => onSelectTemplate(template.code)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#F3F4F6',
                      color: '#374151',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#10348C';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#10348C';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '12px', fontFamily: 'var(--font-inter-tight), system-ui, -apple-system, sans-serif' }}>
        Click any template to load it into the editor
      </p>
    </div>
  );
}
