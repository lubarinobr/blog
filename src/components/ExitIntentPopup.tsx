import { useState, useEffect, useCallback } from 'react';

interface ExitIntentPopupProps {
    locale: string;
}

export default function ExitIntentPopup({ locale }: ExitIntentPopupProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    const STORAGE_KEY = 'exit-popup-dismissed';
    const DAYS_TO_REMEMBER = 7;

    // Ensure component only runs on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const translations = {
        pt: {
            title: 'Antes de ir...',
            subtitle: 'Precisa de ajuda com sua jornada cloud?',
            description: 'Nossa equipe de especialistas pode ajudar sua empresa a encontrar o equilíbrio certo entre controle e velocidade.',
            cta: 'Fale com a gente',
            dismiss: 'Agora não, obrigado',
        },
        en: {
            title: 'Before you go...',
            subtitle: 'Need help with your cloud journey?',
            description: 'Our team of experts can help your company find the right balance between control and speed.',
            cta: 'Talk to us',
            dismiss: 'Not now, thanks',
        },
        es: {
            title: 'Antes de irte...',
            subtitle: '¿Necesitas ayuda con tu jornada cloud?',
            description: 'Nuestro equipo de expertos puede ayudar a tu empresa a encontrar el equilibrio adecuado entre control y velocidad.',
            cta: 'Habla con nosotros',
            dismiss: 'Ahora no, gracias',
        },
    };

    const t = translations[locale as keyof typeof translations] || translations.pt;

    const getContactUrl = useCallback(() => {
        if (locale === 'pt') return '/contact';
        return `/${locale}/contact`;
    }, [locale]);

    const shouldShowPopup = useCallback(() => {
        try {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (!dismissed) return true;

            const dismissedDate = new Date(dismissed);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24));

            return daysDiff >= DAYS_TO_REMEMBER;
        } catch {
            return true;
        }
    }, []);

    const dismissPopup = useCallback(() => {
        setIsVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, new Date().toISOString());
        } catch {
            // localStorage not available
        }
    }, []);

    const handleContactClick = useCallback(() => {
        dismissPopup();
        window.location.href = getContactUrl();
    }, [dismissPopup, getContactUrl]);

    useEffect(() => {
        if (!isMounted || !shouldShowPopup()) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger when mouse leaves through the top of the viewport
            if (e.clientY <= 0 && !hasTriggered) {
                setHasTriggered(true);
                setIsVisible(true);
            }
        };

        // For mobile: trigger on scroll up after scrolling down
        let lastScrollY = window.scrollY;
        let scrolledDown = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // User has scrolled down at least 50% of viewport
            if (currentScrollY > window.innerHeight * 0.5) {
                scrolledDown = true;
            }

            // User is scrolling up quickly after having scrolled down
            if (scrolledDown && !hasTriggered && currentScrollY < lastScrollY - 100) {
                setHasTriggered(true);
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        // Only add desktop exit-intent on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice) {
            document.addEventListener('mouseleave', handleMouseLeave);
        }

        // Add scroll-based trigger for all devices (as fallback for mobile)
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMounted, hasTriggered, shouldShowPopup]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isVisible) {
                dismissPopup();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, dismissPopup]);

    // Prevent body scroll when popup is visible
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    if (!isMounted || !isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={dismissPopup}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={dismissPopup}
                    className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Gradient header */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-8 sm:px-8 sm:py-10">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl" role="img" aria-label="wave">👋</span>
                        <h2
                            id="exit-popup-title"
                            className="text-xl sm:text-2xl font-bold text-white"
                        >
                            {t.title}
                        </h2>
                    </div>
                    <p className="text-blue-100 text-base sm:text-lg font-medium">
                        {t.subtitle}
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                        {t.description}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={handleContactClick}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mb-3"
                    >
                        {t.cta}
                    </button>

                    {/* Dismiss link */}
                    <button
                        onClick={dismissPopup}
                        className="w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
                    >
                        {t.dismiss}
                    </button>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            </div>
        </div>
    );
}
