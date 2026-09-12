import React from 'react';
import { FadeIn, pageTransition } from '@/components/FadeIn';
import { SectionHeader } from '@/components/Typography';
import { motion } from 'framer-motion';
import { CinemaFooter } from '@/components/cinema/CinemaFooter';

export default function Home() {
  return (
    <motion.div {...pageTransition} className="w-full bg-background min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-end p-6 md:p-12 lg:p-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
          <img 
            src="/hero-mycelium.jpg" 
            alt="Mycelial Network" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter uppercase mb-8">
              MICOREGEN<br />VERSE
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-mono text-sm md:text-base tracking-[0.2em] max-w-xl text-white/70 uppercase leading-loose">
              A portal at the intersection of mycelial intelligence, regenerative systems, and bio-civilizational design.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* [ SIGNAL ] SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <SectionHeader label="SIGNAL" className="mb-16" />
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <h2 className="font-display text-4xl md:text-5xl tracking-tighter uppercase mb-8 leading-tight">
                Listening to the<br />Old-Growth<br />System
              </h2>
              <div className="font-sans text-lg text-muted-foreground leading-relaxed space-y-6">
                <p>
                  We are not inventing the future; we are remembering it. The algorithms for resilient civilization have already been written by fungi over a billion years.
                </p>
                <p>
                  This space is a transmission point. A living documentation of practice at the boundary where terrestrial intelligence meets human architecture.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.4} className="relative aspect-[4/3] w-full overflow-hidden grayscale contrast-125">
              <img 
                src="/section-forest.jpg" 
                alt="Ancient Forest Canopy" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* [ THE NETWORK ] SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeader label="THE NETWORK" className="mb-16" />
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bio-Systems Design", desc: "Translating ecological patterns into organizational architecture and governance models." },
              { title: "Emergent Finance", desc: "Capital flow structures modeled on nutrient exchange in mycorrhizal networks." },
              { title: "Narrative Architecture", desc: "Constructing the cultural myths required to sustain regenerative paradigms." }
            ].map((node, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)} className="group border border-border p-8 hover:bg-white/5 transition-colors">
                <div className="text-3xl mb-6 font-mono text-muted-foreground group-hover:text-white transition-colors">0{i + 1}</div>
                <h3 className="font-display text-xl uppercase tracking-wider mb-4">{node.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{node.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* [ FIELD NOTES ] SECTION */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <FadeIn>
          <SectionHeader label="LATEST TRANSMISSIONS" className="mb-16" />
        </FadeIn>
        
        <div className="space-y-12">
          {[
            { date: "OCT 2023", title: "Mycorrhizal Governance: Decentralization in the Soil", read: "8 MIN" },
            { date: "SEP 2023", title: "The End of Extraction: A Bio-Cultural Shift", read: "12 MIN" },
            { date: "AUG 2023", title: "Spores & Silicon: Technological Mimicry of Nature", read: "6 MIN" }
          ].map((post, i) => (
            <FadeIn key={i} delay={0.2 + (i * 0.1)}>
              <a href="/field-notes" className="group flex flex-col md:flex-row md:items-center justify-between pb-8 hover:border-white/40 transition-colors gap-4">
                <div className="font-mono text-sm tracking-widest text-muted-foreground w-32">{post.date}</div>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight flex-1 group-hover:pl-4 transition-all duration-300">{post.title}</h3>
                <div className="font-mono text-xs tracking-widest text-muted-foreground text-right">{post.read}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>
      
      {/* FOOTER AREA / CONNECT */}
      <footer className="relative py-40 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/section-spores.jpg" 
            alt="Spores" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-12">Initialize<br />Contact</h2>
            <a href="/connect" className="font-mono text-sm tracking-[0.2em] border border-white/30 px-8 py-4 hover:bg-white hover:text-black transition-all">
              ENTER THE NETWORK
            </a>
          </FadeIn>
        </div>
      </footer>
      <CinemaFooter />
    </motion.div>
  );
}
