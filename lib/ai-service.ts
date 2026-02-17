import { templates } from './templates';

export interface DesignRequest {
  description: string;
}

export interface DesignResponse {
  customCode: string;
  explanation: string;
  selectedTemplate?: string;
}

export async function generateDesignWithAI(description: string): Promise<DesignResponse> {
  try {
    const response = await fetch('/api/ai-design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate design');
    }

    return await response.json();
  } catch (error) {
    console.error('AI Design Error:', error);
    throw error;
  }
}

export function getTemplateNames(): string {
  return templates.map(t => `- ${t.name}: ${t.category}`).join('\n');
}
