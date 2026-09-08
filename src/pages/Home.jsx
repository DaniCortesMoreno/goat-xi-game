import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroPitch from '../components/home/HeroPitch';
import HowItWorks from '../components/home/HowItWorks';
import PlayCTA from '../components/home/PlayCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Hero Section con Grid Adaptativo */}
      <section className="relative max-w-6xl mx-auto pt-12 sm:pt-20 pb-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Textos y CTA */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-3"
            >
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-[0.3em]">
                ⚽ football game
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-6xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-foreground leading-none"
            >
              GOAT<span className="text-primary">XI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground font-body max-w-sm mx-auto lg:mx-0 leading-relaxed"
            >
              Build the ultimate football XI.
              <br />
              <span className="text-foreground font-medium">Roll random teams.</span>
              {' '}Create your dream lineup.
            </motion.p>

            {/* Quick play button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <Link to="/play">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 py-4 px-10 rounded-2xl font-heading font-bold text-base bg-neutral-900 hover:bg-neutral-800 text-white shadow-xl border border-neutral-800 cursor-pointer transition-colors duration-200"
                >
                  <span className="text-white tracking-wide">PLAY NOW</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Columna Derecha: Campo de fútbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full flex justify-center lg:justify-end xl:justify-center"
          >
            <HeroPitch />
          </motion.div>

        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-4">
        <div className="w-12 h-px bg-border" />
      </div>

      {/* How it works */}
      <HowItWorks />

      {/* Footer */}
      <footer className="py-8 px-5 text-center">
        <p className="text-xs text-muted-foreground font-body">
          GOATXI — A football game for fans who dream big.
        </p>
      </footer>
    </div>
  );
}