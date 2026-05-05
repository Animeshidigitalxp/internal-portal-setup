"use client"
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import BoatCard from './BoatCard';

interface BoatCarouselProps {
    boats: any[]; // Replace 'any[]' with the actual type if available
}

const BoatCarousel = (props: BoatCarouselProps) => {
    const {boats} = props
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isWidgetLarge, setIsWidgetLarge] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>();
    const [isTablet, setIsTablet] = useState<boolean>();
    const [boatsData, setBoatsData] = useState<any[]>([]);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        if(boats && boats.length > 0) {
            console.log('Received boats data:', boats);
            setBoatsData(boats);
        } else {
            console.warn('No boats data received or empty array');
        }
        
    }, [boats]);

    useEffect(()=>{
        setIsMobile(window.innerWidth < 640)
        setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 1024)
    },[])

    // Responsive logic for mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth <= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                //console.log('Container width:', entry.contentRect.width, 'window.innerWidth:', window.innerWidth);
                // Threshold for showing desktop navigation vs mobile swipe
                setContainerWidth(entry.contentRect.width);
                setIsWidgetLarge(window.innerWidth > 1024);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * 0.85; // scroll almost a full card width
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Mock data with real images to look like the image
    // const boatData = [
    //     {
    //         modelYear: "2026",
    //         manufacturer: "MasterCraft",
    //         model: "NXT20",
    //         msrp: "164,358",
    //         askingPrice: "138,206",
    //         savings: "26,152",
    //         image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13" // placeholder URL, use real images in production
    //     },
    //     {
    //         modelYear: "2026",
    //         manufacturer: "MasterCraft",
    //         model: "NXT22",
    //         msrp: "184,533",
    //         askingPrice: "154,980",
    //         savings: "29,553",
    //         image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13" // placeholder URL, use real images in production
    //     },
    //     {
    //         modelYear: "2026",
    //         manufacturer: "MasterCraft",
    //         model: "X24",
    //         msrp: "210,000",
    //         askingPrice: "185,000",
    //         savings: "25,000",
    //         image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13" // placeholder URL, use real images in production
    //     },
    // ];

    // --- Scoped Inline Styles (Carousel Wrapper) ---
    const styles = {
        container: {
            fontFamily: 'inherit',
            maxWidth: '850px',
            margin: isMobile || isTablet ? '12px' : '10px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid #1a56db',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
        } as React.CSSProperties,
        wrapper: {
            width: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            padding: '10px', // generous padding
            backgroundColor: '#f9fafb', // light grey background for the carousel area
        } as React.CSSProperties,
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
        } as React.CSSProperties,
        instruction: {
            fontSize: '18px',
            color: '#4a5568',
            fontWeight: '500'
        } as React.CSSProperties,
        navGroup: {
            display: 'flex',
            gap: '12px'
        } as React.CSSProperties,
        arrowBtn: {
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
        } as React.CSSProperties,
        scrollContainer: {
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: '15px', // clear gap between cards
            paddingBottom: '12px', // prevents button cutoff
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        } as React.CSSProperties,
        cardWrapper: {
            flex: '0 0 auto',
            scrollSnapAlign: 'start',
            // Card width scales based on widget size
            width: containerWidth < 700 ? '260px' : '360px',
        } as React.CSSProperties
    };

    return (
        <div className={'widget-message-subtile'} style={styles.container}>
        <div ref={containerRef} style={styles.wrapper}>

            <header style={styles.header}>
                <span style={styles.instruction}>Here are the best boats for you:</span>

                {/* Desktop Navigation Arrows */}
                {isWidgetLarge && (
                    <div style={styles.navGroup}>
                        <button onClick={() => scroll('left')} style={styles.arrowBtn} aria-label="Previous page">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d3748" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button onClick={() => scroll('right')} style={styles.arrowBtn} aria-label="Next page">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d3748" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                )}
            </header>

            <div
                ref={scrollRef}
                style={styles.scrollContainer}
                className="hide-scrollbar-modern"
            >
                    {boatsData.map((boat, index) => (
                    <div key={index} style={styles.cardWrapper}>
                            <BoatCard {...boat} />
                    </div>
                ))}
            </div>

            <style>{`
        .hide-scrollbar-modern::-webkit-scrollbar { display: none; }
      `}</style>
            
            </div>
        </div>
    );
};

export default BoatCarousel;