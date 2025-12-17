// Product Card Component - Premium Clean Design

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/types';
import { BrandColors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
    product: Product;
    compact?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (Spacing.md * 3)) / 2;

export function ProductCard({ product, compact = false }: ProductCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();

    const handlePress = () => {
        router.push(`/product/${product.id}`);
    };

    const handleQuickAdd = () => {
        addToCart(product, 1);
    };

    return (
        <TouchableOpacity
            style={[styles.card, compact && styles.cardCompact]}
            onPress={handlePress}
            activeOpacity={0.95}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
                {/* Quick Add Button */}
                <TouchableOpacity
                    style={styles.quickAddButton}
                    onPress={handleQuickAdd}
                    activeOpacity={0.8}
                >
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.description} numberOfLines={1}>{product.description || product.category}</Text>
                <Text style={styles.price}>₹{product.pricePerUnit}<Text style={styles.unit}>/{product.unit}</Text></Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.md,
        ...Shadows.md,
        overflow: 'hidden',
    },
    cardCompact: {
        width: 160,
        marginRight: Spacing.md,
    },
    imageContainer: {
        position: 'relative',
        backgroundColor: BrandColors.secondary,
    },
    image: {
        width: '100%',
        height: 110,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
    },
    quickAddButton: {
        position: 'absolute',
        bottom: Spacing.sm,
        right: Spacing.sm,
        width: 32,
        height: 32,
        borderRadius: BorderRadius.md,
        backgroundColor: BrandColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    content: {
        padding: Spacing.sm + 2,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginBottom: Spacing.xs,
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    unit: {
        fontSize: 12,
        fontWeight: '400',
        color: BrandColors.textSecondary,
    },
});
