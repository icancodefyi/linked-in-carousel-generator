export interface Template {
  id: string;
  name: string;
  code: string;
  category: 'hero' | 'stats' | 'list' | 'terms' | 'quote' | 'custom';
}

export const templates: Template[] = [
  {
    id: 'hero-blocks',
    name: 'Hero Blocks',
    category: 'hero',
    code: `<div class="flex flex-col gap-8 items-start">
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    YOU CANNOT
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    CALL THIS
  </div>
  <div class="bg-[#10348C] text-white text-[90px] font-black px-16 py-11 tracking-tight leading-none uppercase">
    EVIDENCE
  </div>
</div>`
  },
  {
    id: 'headline-stats',
    name: 'Headline + Stats',
    category: 'stats',
    code: `<div class="flex flex-col gap-12">
  <h2 class="text-[62px] font-black text-gray-900 leading-tight">
    Most AI detection tools<br/>only provide<br/>a probability score.
  </h2>
  
  <div class="flex flex-col gap-7 w-full">
    <div class="bg-[#10348C] text-white text-[85px] font-black px-20 py-11 tracking-tight leading-none text-center">
      87% REAL
    </div>
    <div class="bg-[#10348C] text-white text-[85px] font-black px-20 py-11 tracking-tight leading-none text-center">
      92% FAKE
    </div>
  </div>
  
  <p class="text-[48px] font-bold text-gray-900 leading-tight">
    That is not evidence.
  </p>
</div>`
  },
  {
    id: 'list-statement',
    name: 'List + Statement',
    category: 'list',
    code: `<div class="flex flex-col justify-between min-h-[1200px]">
  <div class="flex flex-col gap-11">
    <h2 class="text-[62px] font-black text-gray-900 leading-tight">
      Because probability<br/>does not explain how.
    </h2>
    
    <div class="flex flex-col gap-5">
      <p class="text-[36px] font-semibold text-gray-900 leading-snug">
        • Where the media was altered
      </p>
      <p class="text-[36px] font-semibold text-gray-900 leading-snug">
        • What exactly was manipulated
      </p>
      <p class="text-[36px] font-semibold text-gray-900 leading-snug">
        • Whether the source was compared
      </p>
      <p class="text-[36px] font-semibold text-gray-900 leading-snug">
        • How the analysis was conducted
      </p>
    </div>
  </div>
  
  <div class="bg-[#10348C] text-white text-[52px] font-black px-14 py-10 tracking-tight leading-tight self-start uppercase">
    DETECTION ≠ DOCUMENTATION
  </div>
</div>`
  },
  {
    id: 'stacked-terms',
    name: 'Stacked Terms',
    category: 'terms',
    code: `<div class="flex flex-col gap-14">
  <h2 class="text-[62px] font-black text-gray-900 leading-tight">
    Real digital evidence<br/>requires structure.
  </h2>
  
  <div class="flex flex-col gap-7 items-start">
    <div class="bg-[#10348C] text-white text-[54px] font-black px-16 py-10 tracking-tight leading-none uppercase">
      TAMPER LOCALIZATION
    </div>
    <div class="bg-[#10348C] text-white text-[54px] font-black px-16 py-10 tracking-tight leading-none uppercase">
      REFERENCE COMPARISON
    </div>
    <div class="bg-[#10348C] text-white text-[54px] font-black px-16 py-10 tracking-tight leading-none uppercase">
      CHAIN OF CUSTODY
    </div>
    <div class="bg-[#10348C] text-white text-[54px] font-black px-16 py-10 tracking-tight leading-none uppercase">
      STRUCTURED REPORTING
    </div>
  </div>
</div>`
  },
  {
    id: 'big-quote',
    name: 'Big Quote',
    category: 'quote',
    code: `<div class="flex flex-col gap-14 items-start">
  <div class="text-[72px] font-black text-gray-900 leading-tight">
    "The future belongs<br/>to those who<br/>prepare for it today."
  </div>
  
  <div class="bg-yellow-400 px-16 py-8">
    <p class="text-[42px] font-black text-gray-900 leading-tight">
      — Malcolm X
    </p>
  </div>
</div>`
  },
  {
    id: 'stat-highlight',
    name: 'Single Stat',
    category: 'stats',
    code: `<div class="flex flex-col items-center justify-center gap-12 text-center min-h-[1100px]">
  <div class="bg-[#10348C] px-20 py-16">
    <div class="text-[140px] font-black text-white leading-none">
      95%
    </div>
  </div>
  
  <p class="text-[56px] font-bold text-gray-900 leading-tight max-w-[900px]">
    of businesses will use<br/>AI by 2027
  </p>
</div>`
  }
];
