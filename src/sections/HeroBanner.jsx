import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

/* ─────────────── Event Mockup Card Data ─────────────── */
const eventCards = [
    {
        id: 'wedding',
        titleKey: 'hero.cards.wedding.title',
        subtitleKey: 'hero.cards.wedding.subtitle',
        gradient: 'from-amber-800 via-orange-700 to-yellow-600',
        accentColor: 'bg-amber-400',
        emoji: '💍',
        decorEmoji: '🕯️',
    },
    {
        id: 'birthday',
        titleKey: 'hero.cards.birthday.title',
        subtitleKey: 'hero.cards.birthday.subtitle',
        gradient: 'from-orange-500 via-amber-500 to-yellow-400',
        accentColor: 'bg-pink-400',
        emoji: '🎂',
        decorEmoji: '🎈',
    },
    {
        id: 'conference',
        titleKey: 'hero.cards.conference.title',
        subtitleKey: 'hero.cards.conference.subtitle',
        gradient: 'from-slate-900 via-blue-900 to-indigo-800',
        accentColor: 'bg-blue-400',
        emoji: '🎤',
        decorEmoji: '🏢',
    },
    {
        id: 'diwali',
        titleKey: 'hero.cards.diwali.title',
        subtitleKey: 'hero.cards.diwali.subtitle',
        gradient: 'from-red-900 via-orange-800 to-amber-600',
        accentColor: 'bg-yellow-400',
        emoji: '🪔',
        decorEmoji: '🎆',
    },
];

/* ─────────────── Bokeh Particle Data ─────────────── */
const bokehParticles = [
    { size: 'w-3 h-3', color: 'bg-amber-400/40', top: '15%', left: '8%', delay: '0s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-orange-300/50', top: '25%', left: '85%', delay: '1s', anim: 'animate-glow-slow' },
    { size: 'w-4 h-4', color: 'bg-yellow-400/30', top: '60%', left: '12%', delay: '0.5s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-amber-300/60', top: '70%', left: '90%', delay: '2s', anim: 'animate-glow-slow' },
    { size: 'w-3 h-3', color: 'bg-orange-400/35', top: '40%', left: '5%', delay: '1.5s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-yellow-300/45', top: '20%', left: '70%', delay: '0.8s', anim: 'animate-glow-slow' },
    { size: 'w-3 h-3', color: 'bg-amber-500/25', top: '80%', left: '30%', delay: '2.5s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-orange-300/50', top: '10%', left: '45%', delay: '1.2s', anim: 'animate-glow-slow' },
    { size: 'w-4 h-4', color: 'bg-yellow-500/20', top: '50%', left: '75%', delay: '0.3s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-red-400/30', top: '85%', left: '60%', delay: '1.8s', anim: 'animate-glow-slow' },
    { size: 'w-3 h-3', color: 'bg-amber-400/35', top: '35%', left: '92%', delay: '0.7s', anim: 'animate-glow' },
    { size: 'w-2 h-2', color: 'bg-orange-400/40', top: '55%', left: '50%', delay: '2.2s', anim: 'animate-glow-slow' },
];

/* ─────────────── Single Event Mockup Card ─────────────── */
const EventMockupCard = ({ card, index, t }) => {
    // Stagger the animation direction for variety
    const isEven = index % 2 === 0;
    const floatClass = isEven ? 'animate-float' : 'animate-float-reverse';
    const delayStyle = { animationDelay: `${index * 0.4}s` };

    // Slight 3D rotation for each card in the perspective row
    const rotations = ['-6deg', '-2deg', '2deg', '6deg'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: 'easeOut',
            }}
            className="flex-shrink-0"
        >
            <div
                className={`${floatClass} w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px]`}
                style={{
                    ...delayStyle,
                    transform: `perspective(1000px) rotateY(${rotations[index]})`,
                }}
            >
                {/* Card Frame — Glass-morphism browser mockup */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm
                        hover:scale-105 hover:shadow-amber-500/20 transition-all duration-500 group
                        cursor-pointer">
                    {/* Browser Chrome */}
                    <div className="bg-gray-800/90 px-3 py-2 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                        <div className="ml-2 flex-1 bg-gray-700/60 rounded-full h-4 px-2 flex items-center">
                            <span className="text-[8px] text-gray-400 font-sans truncate">eventmacha.com</span>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className={`relative bg-gradient-to-br ${card.gradient} p-5 h-[160px] sm:h-[170px]
                          md:h-[180px] flex flex-col justify-between overflow-hidden`}>
                        {/* Decorative background emoji */}
                        <span className="absolute -right-2 -top-2 text-5xl opacity-15 group-hover:opacity-25
                            transition-opacity duration-500 select-none pointer-events-none"
                            aria-hidden="true">
                            {card.decorEmoji}
                        </span>
                        <span className="absolute -left-1 -bottom-1 text-4xl opacity-10 group-hover:opacity-20
                            transition-opacity duration-500 select-none pointer-events-none"
                            aria-hidden="true">
                            {card.decorEmoji}
                        </span>

                        {/* Title Area */}
                        <div>
                            <span className="text-2xl mb-1 block" role="img" aria-label={card.id}>
                                {card.emoji}
                            </span>
                            <h3 className="text-white font-serif font-bold text-base sm:text-lg leading-tight
                            drop-shadow-lg">
                                {t(card.titleKey)}
                            </h3>
                            <p className="text-white/80 font-sans text-xs sm:text-sm mt-0.5 drop-shadow-md">
                                {t(card.subtitleKey)}
                            </p>
                        </div>

                        {/* Fake CTA Button */}
                        <div className="flex items-center gap-2">
                            <div className={`${card.accentColor} rounded-full px-3 py-1 text-[10px] font-sans
                              font-bold text-gray-900 shadow-md`}>
                                {t('hero.viewDetails')}
                            </div>
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-white text-[10px]">→</span>
                            </div>
                        </div>

                        {/* Light Streak Shimmer overlay */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                            <div className="absolute w-24 h-full bg-gradient-to-r from-transparent via-white/10
                            to-transparent animate-shimmer"
                                style={{ animationDelay: `${index * 1.2}s` }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ═══════════════ HERO BANNER COMPONENT ═══════════════ */
const HeroBanner = () => {
    const { t } = useTranslation();

    /* ── Auto-scroll carousel on mobile ── */
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoScrollTimer = useRef(null);
    const resumeTimer = useRef(null);
    const isMobile = useRef(false);

    // Scroll to a specific card index (horizontal only, no page scroll)
    const scrollToCard = useCallback((index) => {
        const container = scrollRef.current;
        if (!container) return;
        const card = container.children[index];
        if (card) {
            const scrollLeft = card.offsetLeft - container.offsetLeft
                - (container.clientWidth / 2) + (card.offsetWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            setActiveIndex(index);
        }
    }, []);

    // Start auto-scroll interval
    const startAutoScroll = useCallback(() => {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % eventCards.length;
                scrollToCard(next);
                return next;
            });
        }, 3000);
    }, [scrollToCard]);

    // Pause auto-scroll on user interaction, resume after 5s
    const pauseAutoScroll = useCallback(() => {
        clearInterval(autoScrollTimer.current);
        clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
            if (isMobile.current) startAutoScroll();
        }, 5000);
    }, [startAutoScroll]);

    useEffect(() => {
        const checkMobile = () => {
            // md breakpoint = 768px
            isMobile.current = window.innerWidth < 768;
            if (isMobile.current) {
                startAutoScroll();
            } else {
                clearInterval(autoScrollTimer.current);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Listen for user scroll/touch to pause auto-scroll
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('touchstart', pauseAutoScroll);
            container.addEventListener('scroll', pauseAutoScroll);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(autoScrollTimer.current);
            clearTimeout(resumeTimer.current);
            if (container) {
                container.removeEventListener('touchstart', pauseAutoScroll);
                container.removeEventListener('scroll', pauseAutoScroll);
            }
        };
    }, [startAutoScroll, pauseAutoScroll]);

    return (
        <section
            id="home"
            aria-label="Hero Banner"
            className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px]
                 flex flex-col items-center justify-center overflow-hidden
                 bg-gradient-to-b from-[#1a0a2e] via-[#2d1810] to-[#1a0e05]"
        >
            {/* ── Background Light Effects ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {/* Large warm glow — center top */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                        rounded-full bg-orange-500/15 blur-[120px] animate-glow-slow"></div>
                {/* Warm glow — left */}
                <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px]
                        rounded-full bg-amber-600/10 blur-[100px] animate-glow"></div>
                {/* Warm glow — right */}
                <div className="absolute top-[40%] right-[-5%] w-[350px] h-[350px]
                        rounded-full bg-orange-700/10 blur-[90px] animate-glow-slow"></div>
                {/* Bottom light streak */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
                {/* Curved light streaks */}
                <div className="absolute bottom-[15%] left-[5%] right-[5%] h-[1px]
                        bg-gradient-to-r from-transparent via-orange-400/20 to-transparent
                        rounded-full blur-[1px]"></div>
                <div className="absolute bottom-[20%] left-[15%] right-[15%] h-[1px]
                        bg-gradient-to-r from-transparent via-amber-400/15 to-transparent
                        rounded-full blur-[2px]"></div>
            </div>

            {/* ── Bokeh Particles ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {bokehParticles.map((p, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full ${p.size} ${p.color} ${p.anim} blur-[1px]`}
                        style={{ top: p.top, left: p.left, animationDelay: p.delay }}
                    ></div>
                ))}
            </div>

            {/* ── Floating Event Mockup Cards ── */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-8 md:pt-12 lg:pt-16">
                {/* Desktop: Perspective Row | Mobile/Tablet: Scrollable */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-5 lg:gap-6 justify-start md:justify-center
                        overflow-x-auto md:overflow-visible pb-4 md:pb-0
                        scrollbar-hide snap-x snap-mandatory md:snap-none
                        px-4 md:px-0"
                    style={{ perspective: '1200px' }}>
                    {eventCards.map((card, index) => (
                        <div key={card.id} className="snap-center">
                            <EventMockupCard card={card} index={index} t={t} />
                        </div>
                    ))}
                </div>

                {/* Mobile scroll indicator */}
                {/* Mobile scroll indicator — active dot highlights */}
                <div className="flex md:hidden justify-center mt-3 gap-1.5" aria-hidden="true">
                    {eventCards.map((card, index) => (
                        <button
                            key={card.id}
                            onClick={() => { scrollToCard(index); pauseAutoScroll(); }}
                            className={`rounded-full transition-all duration-300 ${index === activeIndex
                                ? 'w-4 h-1.5 bg-amber-400'
                                : 'w-1.5 h-1.5 bg-amber-400/40'
                                }`}
                            aria-label={`Go to card ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Text Content ── */}
            <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto
                      mt-10 md:mt-14 lg:mt-16 pb-12 md:pb-16">
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold
                     text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
                >
                    {t('hero.heading')}
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 font-sans
                     mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md"
                >
                    {t('hero.subtext')}
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
                    whileHover={{
                        scale: 1.06,
                        boxShadow: '0 0 40px rgba(251, 184, 19, 0.4)',
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-gradient-to-r from-brand-saffron to-brand-turmeric
                     text-white font-sans font-bold
                     px-8 py-3.5 md:px-10 md:py-4 rounded-xl text-base md:text-lg
                     transition-all duration-300 shadow-xl shadow-orange-500/20
                     border border-brand-gold/30 animate-pulse-glow
                     hover:from-brand-turmeric hover:to-brand-saffron"
                    aria-label={t('hero.cta')}
                >
                    {t('hero.cta')}
                </motion.button>

                {/* Decorative gold line */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="mt-8 md:mt-10 mx-auto w-24 h-[2px]
                     bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full"
                    aria-hidden="true"
                ></motion.div>
            </div>

            {/* ── Bottom Gradient Fade (seamless transition to next section) ── */}
            <div className="absolute bottom-0 left-0 right-0 h-20
                      bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-20
                      pointer-events-none" aria-hidden="true"></div>
        </section>
    );
};

export default HeroBanner;
