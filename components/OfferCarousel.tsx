// Offer Carousel Component - Premium Design with Auto-scroll

import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
} from 'react-native';
import { Offer } from '@/types';
import { BrandColors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

interface OfferCarouselProps {
    offers: Offer[];
    autoScrollInterval?: number; // in milliseconds
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (Spacing.md * 2);
const CARD_HEIGHT = 150;
const SNAP_WIDTH = CARD_WIDTH + Spacing.md;

export function OfferCarousel({ offers, autoScrollInterval = 4000 }: OfferCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);
    const isAutoScrolling = useRef(false);

    // Create extended offers array with first item duplicated at end for seamless loop
    const extendedOffers = [...offers, offers[0]];

    // Auto-scroll effect
    useEffect(() => {
        const timer = setInterval(() => {
            isAutoScrolling.current = true;
            const nextIndex = activeIndex + 1;

            scrollRef.current?.scrollTo({
                x: nextIndex * SNAP_WIDTH,
                animated: true,
            });

            // If we just scrolled to the duplicate (last position), 
            // wait for animation to complete then jump to start
            if (nextIndex >= offers.length) {
                setTimeout(() => {
                    scrollRef.current?.scrollTo({
                        x: 0,
                        animated: false,
                    });
                    setActiveIndex(0);
                    isAutoScrolling.current = false;
                }, 350); // Wait for scroll animation to complete
            } else {
                setActiveIndex(nextIndex);
                isAutoScrolling.current = false;
            }
        }, autoScrollInterval);

        return () => clearInterval(timer);
    }, [activeIndex, offers.length, autoScrollInterval]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isAutoScrolling.current) return;

        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / SNAP_WIDTH);

        if (index !== activeIndex && index >= 0 && index < offers.length) {
            setActiveIndex(index);
        }
    };

    const handleScrollEnd = () => {
        // If user manually scrolled to the duplicate, jump back to start
        if (activeIndex >= offers.length) {
            scrollRef.current?.scrollTo({
                x: 0,
                animated: false,
            });
            setActiveIndex(0);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={SNAP_WIDTH}
                contentContainerStyle={styles.scrollContent}
            >
                {extendedOffers.map((offer, index) => (
                    <View
                        key={`${offer.id}-${index}`}
                        style={[styles.card, { backgroundColor: offer.backgroundColor }]}
                    >
                        <View style={styles.cardContent}>
                            <Text style={[styles.title, { color: offer.textColor }]}>
                                {offer.title}
                            </Text>
                            <Text style={[styles.subtitle, { color: offer.textColor }]}>
                                {offer.subtitle}
                            </Text>
                            <TouchableOpacity style={styles.shopButton} activeOpacity={0.9}>
                                <Text style={styles.shopButtonText}>Shop Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Pagination dots - only show for original offers */}
            <View style={styles.pagination}>
                {offers.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            (index === activeIndex || (activeIndex >= offers.length && index === 0)) && styles.dotActive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: Spacing.md,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.md,
    },
    cardContent: {
        flex: 1,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: 13,
        opacity: 0.9,
        marginBottom: Spacing.md,
        lineHeight: 18,
    },
    shopButton: {
        backgroundColor: BrandColors.secondary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        alignSelf: 'flex-start',
    },
    shopButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: BrandColors.primary,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: BrandColors.primary,
        width: 24,
    },
});
