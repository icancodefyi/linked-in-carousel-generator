import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { templates } from '@/lib/templates';

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are a LinkedIn carousel designer. Your ONLY job is to:

1. READ the user request
2. CHOOSE the BEST template from the list below
3. CUSTOMIZE ONLY the TEXT content in that template
4. DO NOT change any HTML tags, class names, or structure
5. DO NOT modify Tailwind classes, colors, or spacing

AVAILABLE TEMPLATES:
${templates.map(t => `Name: "${t.name}" (${t.category})\n${t.code}`).join('\n\n---\n\n')}

USER REQUEST: "${description}"

Return ONLY this JSON:
{
  "templateName": "name of chosen template",
  "customCode": "template with ONLY text replaced",
  "explanation": "why this template works"
}

CRITICAL - Do NOT modify:
- Any HTML tags or structure
- Any Tailwind classes
- Any colors, spacing, or font sizes
- ONLY change text content between tags`;

    // Initialize Groq client
    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = chatCompletion.choices[0]?.message?.content || '';

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // FIX: Convert backticks to quotes globally in entire response FIRST
    let fixedContent = content.replace(/`/g, '"');

    // Extract JSON from response
    const jsonMatch = fixedContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', fixedContent);
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    // Parse the JSON with proper sanitization
    let result;
    let jsonString = jsonMatch[0];
    
    try {
      // First attempt: direct parse
      result = JSON.parse(jsonString);
    } catch (parseError) {
      try {
        // Second attempt: escape control characters globally
        // Replace actual newlines/returns with escaped versions
        const escaped = jsonString
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t')
          .replace(/\f/g, '\\f')
          .replace(/\b/g, '\\b');
        
        result = JSON.parse(escaped);
      } catch (secondError) {
        try {
          // Third attempt: replace problematic characters with spaces
          const cleaned = jsonString
            .replace(/[\n\r\f\b]/g, ' ')
            .replace(/\t/g, ' ')
            .replace(/\s{2,}/g, ' ');
          
          result = JSON.parse(cleaned);
        } catch (thirdError) {
          console.error('JSON Parse Fallback Failed:', {
            primaryError: parseError instanceof Error ? parseError.message : String(parseError),
            secondaryError: secondError instanceof Error ? secondError.message : String(secondError),
            tertiaryError: thirdError instanceof Error ? thirdError.message : String(thirdError),
            jsonPreview: jsonString.substring(0, 300)
          });
          return NextResponse.json(
            { error: 'Failed to parse AI response. Check server logs.' },
            { status: 500 }
          );
        }
      }
    }

    // Validate response
    if (!result.customCode || !result.explanation) {
      return NextResponse.json(
        { error: 'Invalid response structure' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      customCode: result.customCode,
      explanation: result.explanation,
      templateName: result.templateName || 'Custom',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
