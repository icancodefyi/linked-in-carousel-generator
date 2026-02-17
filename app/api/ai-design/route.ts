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

    const prompt = `You are a professional LinkedIn carousel designer. Create a slide with perfect visual hierarchy, spacing, and typography.

EXACT TAILWIND CLASS NAMES (Copy exactly, no substitutions):
=============================================================

TEXT SIZES - Use EXACTLY these classes:
- text-[90px] (for blue blocks with font-black + uppercase)
- text-[85px] (for stat blocks)
- text-[62px] (for headlines)
- text-[40px] (for subheadings)
- text-[36px] (for body text)
- text-[24px] (for captions)

FONT WEIGHTS - Use EXACTLY these classes:
- font-black (ONLY for headlines, blue blocks, stats - makes text bold and heavy)
- font-semibold (ONLY for body text - medium weight)

COLORS - Use EXACTLY these classes:
- text-gray-900 (for all body and headline text)
- text-white (for text on blue blocks only)
- bg-[#10348C] (ONLY for blue blocks with text-white)

SPACING - Use EXACTLY these classes:
- gap-8 (main container spacing)
- gap-12 or gap-14 (between major sections)
- gap-7 (between list items)

LINE HEIGHT - Use EXACTLY these classes:
- leading-tight (for all text)
- leading-none (ONLY with uppercase blue blocks)

CONTAINER - Use EXACTLY this wrapper:
<div class="flex flex-col gap-8 items-start">
  YOUR CONTENT HERE
</div>

CRITICAL FORMATTING RULES:
1. All class names must use SQUARE BRACKETS with units: text-[90px] NOT text-90
2. Use DOUBLE QUOTES for all HTML attributes
3. Return VALID JSON only
4. HTML code goes inside "customCode" value
5. Add backslashes before quotes inside HTML strings

USER REQUEST: "${description}"

RESPOND WITH EXACTLY THIS FORMAT (valid JSON):
{
  "customCode": "<div class=\\"flex flex-col gap-8 items-start\\">...</div>",
  "explanation": "brief description"
}

REMEMBER: Copy class names EXACTLY as shown above. Do not use shorthand.`;

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

    // Validate response structure
    if (!result.customCode || !result.explanation) {
      return NextResponse.json(
        { error: 'Invalid response structure from AI' },
        { status: 500 }
      );
    }

    // Validate code structure - must have proper wrapper and allowed classes only
    const code = result.customCode;
    const allowedClasses = [
      'flex',
      'flex-col',
      'gap-8',
      'items-start',
      'bg-[#10348C]',
      'text-white',
      'text-[90px]',
      'text-[85px]',
      'text-[62px]',
      'text-[40px]',
      'text-[36px]',
      'text-[24px]',
      'text-[20px]',
      'text-gray-900',
      'font-black',
      'font-semibold',
      'font-bold',
      'px-16',
      'px-20',
      'py-11',
      'py-10',
      'tracking-tight',
      'leading-none',
      'leading-tight',
      'leading-snug',
      'uppercase',
      'text-center',
      'italic',
      'border-l-4',
      'border-[#10348C]',
      'pl-8',
      'py-4',
      'h-px',
      'bg-gray-300',
      'my-8',
      'w-full',
      'break-word',
      'inline-block',
      'translate-none',
      'scale-100'
    ];

    // Check for invalid class patterns
    const classRegex = /class="([^"]*)"/g;
    let match;
    while ((match = classRegex.exec(code)) !== null) {
      const classes = match[1].split(' ').filter((c: string) => c.trim());
      for (const cls of classes) {
        if (!allowedClasses.includes(cls)) {
          console.warn('Invalid class found:', cls);
          // Only warn, don't reject - AI might use harmless variants
        }
      }
    }

    // Light validation - fix common shorthand classes and remove inline styles
    if (result.customCode.includes('style=')) {
      console.warn('Removing inline styles');
      result.customCode = result.customCode.replace(/\s*style="[^"]*"/g, '');
    }

    // Fix common shorthand text sizes (e.g., text-90 -> text-[90px])
    result.customCode = result.customCode
      .replace(/text-90(?!0|\[)/g, 'text-[90px]')
      .replace(/text-85(?!0|\[)/g, 'text-[85px]')
      .replace(/text-62(?!0|\[)/g, 'text-[62px]')
      .replace(/text-40(?!0|\[)/g, 'text-[40px]')
      .replace(/text-36(?!0|\[)/g, 'text-[36px]')
      .replace(/text-24(?!0|\[)/g, 'text-[24px]')
      .replace(/text-20(?!0|\[)/g, 'text-[20px]');

    // Fix improper leading classes
    result.customCode = result.customCode
      .replace(/leading-normal/g, 'leading-tight')
      .replace(/leading-loose/g, 'leading-tight');

    // Ensure proper wrapper exists
    if (!result.customCode.includes('flex flex-col gap-8 items-start')) {
      console.warn('Adding proper wrapper');
      result.customCode = `<div class="flex flex-col gap-8 items-start">${result.customCode}</div>`;
    }

    return NextResponse.json({
      customCode: result.customCode,
      explanation: result.explanation,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
