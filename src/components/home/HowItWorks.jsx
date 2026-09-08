import React from 'react';
import { Dices, Users, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { no: '01', title: 'Roll', desc: 'Get a random iconic club and a legendary season from history.', icon: <Dices className="w-6 h-6 text-foreground" /> },
    { no: '02', title: 'Build', desc: 'Pick a superstar who actually wore that jersey back in the day.', icon: <Users className="w-6 h-6 text-foreground" /> },
    { no: '03', title: 'Simulate', desc: 'Run the matchdays to see if your squad dominates the league.', icon: <Zap className="w-6 h-6 text-foreground" /> },
  ];
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <span className="text-2xl font-black text-primary/40 tracking-tight font-heading">{step.no}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                {step.icon}
                <h3 className="font-heading font-bold text-lg text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}