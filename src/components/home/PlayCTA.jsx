import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export default function PlayCTA() {
  return (
    <section className="max-w-md mx-auto px-5 py-8 text-center">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <Trophy className="w-8 h-8 text-accent mx-auto mb-3" />
        <h4 className="font-heading font-bold text-base text-foreground mb-1">Are you ready to beat the odds?</h4>
        <p className="text-xs text-muted-foreground font-body mb-5">Join thousands of managers and build your legacy now.</p>
        <Link to="/play" className="block w-full bg-primary text-primary-foreground font-heading font-bold py-3 px-4 rounded-xl shadow-md hover:opacity-90 transition-opacity">
          START DRAFTING
        </Link>
      </div>
    </section>
  );
}