import React from 'react';
export default function HeroPitch() {
  const players = [
    { name: 'Casillas', pos: { left: '50%', top: '86%' }, num: 1 },
    { name: 'Maldini', pos: { left: '18%', top: '70%' }, num: 3 },
    { name: 'Ramos', pos: { left: '40%', top: '74%' }, num: 4 },
    { name: 'Puyol', pos: { left: '60%', top: '74%' }, num: 5 },
    { name: 'Dani Alves', pos: { left: '82%', top: '70%' }, num: 2 },
    { name: 'Xavi', pos: { left: '30%', top: '48%' }, num: 6 },
    { name: 'Zidane', pos: { left: '50%', top: '52%' }, num: 10 },
    { name: 'Iniesta', pos: { left: '70%', top: '48%' }, num: 8 },
    { name: 'Ronaldinho', pos: { left: '20%', top: '24%' }, num: 10 },
    { name: 'Messi', pos: { left: '80%', top: '24%' }, num: 10 },
    { name: 'Ronaldo', pos: { left: '50%', top: '16%' }, num: 9 },
  ];
  return (
    <div className="flex justify-center w-100 px-4">
      <div className="w-full max-w-[340px] aspect-[3/4] bg-[#173827] border-[2.5px] border-[#1c1c1a] rounded-xl relative shadow-[12px_12px_0px_rgba(28,28,26,0.15)] overflow-hidden pitch-pattern">
        <svg className="absolute inset-0 w-full h-full stroke-white/30 fill-none" viewBox="0 0 300 400" preserveAspectRatio="none">
          <line x1="0" y1="200" x2="300" y2="200" strokeWidth="1.5"></line>
          <circle cx="150" cy="200" r="46" strokeWidth="1.5"></circle>
          <path d="M62 0 V60 H238 V0 M112 0 V22 H188 V0 M62 400 V340 H238 V400 M112 400 V378 H188 V400" strokeWidth="1.5"></path>
        </svg>
        {players.map((p, idx) => (
          <div key={idx} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={p.pos}>
            <div className="w-6 h-6 bg-[#f7f4eb] border border-[#1c1c1a] rounded-full text-[10px] font-black flex items-center justify-center text-[#1c1c1a] shadow-md">{p.num}</div>
            <div className="text-[9px] font-bold text-[#f7f4eb] bg-[#1c1c1a] px-1.5 py-0.5 rounded mt-1 shadow-sm whitespace-nowrap">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}