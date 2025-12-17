// Product Detail Screen

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { QuantitySelector } from '@/components/QuantitySelector';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const product = getProductById(id || '');

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color={BrandColors.danger} />
                    <Text style={styles.errorText}>Product not found</Text>
                    <Button title="Go Back" onPress={() => router.back()} variant="outline" />
                </View>
            </SafeAreaView>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        Alert.alert(
            'Added to Cart',
            `${quantity} ${product.unit} of ${product.name} added to your cart`,
            [
                { text: 'Continue Shopping', style: 'cancel' },
                { text: 'Go to Cart', onPress: () => router.push('/(tabs)/cart') },
            ]
        );
    };

    const totalPrice = product.pricePerUnit * quantity;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.image}
                        contentFit="cover"
                    />
                    {product.isBestSeller && (
                        <View style={styles.badge}>
                            <Ionicons name="flame" size={14} color="#FFFFFF" />
                            <Text style={styles.badgeText}>Best Seller</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.content}>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.name}>{product.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹{product.pricePerUnit}</Text>
                        <Text style={styles.unit}>per {product.unit}</Text>
                    </View>

                    {product.description && (
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionTitle}>About this product</Text>
                            <Text style={styles.description}>{product.description}</Text>
                        </View>
                    )}

                    {/* Stock Info */}
                    <View style={styles.stockContainer}>
                        <Ionicons
                            name={product.stock > 50 ? 'checkmark-circle' : 'alert-circle'}
                            size={18}
                            color={product.stock > 50 ? BrandColors.primary : BrandColors.accent}
                        />
                        <Text style={[
                            styles.stockText,
                            { color: product.stock > 50 ? BrandColors.primary : BrandColors.accent }
                        ]}>
                            {product.stock > 50 ? 'In Stock' : `Only ${product.stock}${product.unit} left`}
                        </Text>
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityLabel}>Quantity ({product.unit})</Text>
                        <QuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                            min={1}
                            max={product.stock}
                            unit={product.unit}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalPrice}>₹{totalPrice}</Text>
                </View>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    size="lg"
                    style={styles.addButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BrandColors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.lg,
        gap: Spacing.md,
    },
    errorText: {
        fontSize: 18,
        color: BrandColors.textSecondary,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        backgroundColor: BrandColors.card,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    badge: {
        position: 'absolute',
        top: Spacing.md,
        left: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.primary,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
        gap: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: Spacing.md,
    },
    category: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: BrandColors.textPrimary,
        marginTop: Spacing.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: Spacing.md,
        gap: Spacing.xs,
    },
    price: {
        fontSize: 28,
        fontWeight: '700',
        color: BrandColors.primary,
    },
    unit: {
        fontSize: 16,
        color: BrandColors.textSecondary,
    },
    descriptionContainer: {
        marginTop: Spacing.lg,
        padding: Spacing.md,
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
    },
    descriptionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.sm,
    },
    description: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        lineHeight: 20,
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
        gap: Spacing.xs,
    },
    stockText: {
        fontSize: 14,
        fontWeight: '500',
    },
    quantitySection: {
        marginTop: Spacing.lg,
    },
    quantityLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.sm,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.card,
        padding: Spacing.md,
        paddingBottom: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: BrandColors.border,
        gap: Spacing.md,
    },
    totalContainer: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: BrandColors.textSecondary,
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    addButton: {
        flex: 1,
    },
});
