// Cart Screen - View and manage cart items

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { CartItemCard } from '@/components/CartItemCard';
import { Button } from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

export default function CartScreen() {
    const { items, getTotal, clearCart } = useCart();
    const router = useRouter();

    const total = getTotal();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        router.push('/checkout');
    };

    const handleContinueShopping = () => {
        router.push('/(tabs)/categories');
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Cart</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color={BrandColors.textSecondary} />
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtext}>
                        Add some fresh fruits to get started!
                    </Text>
                    <Button
                        title="Browse Products"
                        onPress={handleContinueShopping}
                        style={{ marginTop: Spacing.lg }}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Cart</Text>
                <Text style={styles.itemCount}>{itemCount} items</Text>
            </View>

            {/* Cart Items */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {items.map(item => (
                    <CartItemCard key={item.product.id} item={item} />
                ))}

                {/* Clear Cart Button */}
                <View style={styles.clearButtonContainer}>
                    <Button
                        title="Clear Cart"
                        onPress={clearCart}
                        variant="outline"
                        size="sm"
                    />
                </View>
            </ScrollView>

            {/* Bottom Summary */}
            <View style={styles.bottomSection}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>₹{total}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Delivery</Text>
                    <Text style={styles.deliveryText}>Calculated at checkout</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>₹{total}</Text>
                </View>
                <Button
                    title="Proceed to Checkout"
                    onPress={handleCheckout}
                    fullWidth
                    size="lg"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BrandColors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    itemCount: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: Spacing.md,
    },
    clearButtonContainer: {
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        marginTop: Spacing.lg,
    },
    emptySubtext: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginTop: Spacing.sm,
        textAlign: 'center',
    },
    bottomSection: {
        backgroundColor: BrandColors.card,
        padding: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: BrandColors.border,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    summaryLabel: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    summaryValue: {
        fontSize: 14,
        color: BrandColors.textPrimary,
        fontWeight: '500',
    },
    deliveryText: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: BrandColors.border,
        marginVertical: Spacing.sm,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: BrandColors.primary,
    },
});
