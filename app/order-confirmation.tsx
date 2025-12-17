// Order Confirmation Screen

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { useOrders } from '@/contexts/OrderContext';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

export default function OrderConfirmationScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ orderId: string }>();
    const { getOrderById } = useOrders();

    const order = getOrderById(params.orderId || '');

    const handleViewOrders = () => {
        router.replace('/(tabs)/orders');
    };

    const handleContinueShopping = () => {
        router.replace('/');
    };

    if (!order) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color={BrandColors.danger} />
                    <Text style={styles.errorText}>Order not found</Text>
                    <Button title="Go Home" onPress={handleContinueShopping} />
                </View>
            </SafeAreaView>
        );
    }

    const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const deliveryDate = new Date(order.deliveryDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Success Header */}
                <View style={styles.header}>
                    <View style={styles.successIcon}>
                        <Ionicons name="checkmark-circle" size={80} color={BrandColors.primary} />
                    </View>
                    <Text style={styles.title}>Order Confirmed!</Text>
                    <Text style={styles.subtitle}>
                        Thank you for your order. We'll notify you when it's on the way.
                    </Text>
                </View>

                {/* Order ID Card */}
                <View style={styles.orderIdCard}>
                    <Text style={styles.orderIdLabel}>Order ID</Text>
                    <Text style={styles.orderIdValue}>{order.id}</Text>
                    <Text style={styles.orderDate}>{orderDate}</Text>
                </View>

                {/* Delivery Info */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="calendar-outline" size={20} color={BrandColors.primary} />
                        <Text style={styles.sectionTitle}>Expected Delivery</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.deliveryDate}>{deliveryDate}</Text>
                        <Text style={styles.deliveryNote}>
                            Delivery time may vary based on your location
                        </Text>
                    </View>
                </View>

                {/* Order Items */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="basket-outline" size={20} color={BrandColors.primary} />
                        <Text style={styles.sectionTitle}>Order Items</Text>
                    </View>
                    <View style={styles.card}>
                        {order.items.map((item, index) => (
                            <View key={index} style={styles.orderItem}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.productName}</Text>
                                    <Text style={styles.itemQty}>
                                        {item.quantity} {item.unit} × ₹{item.pricePerUnit}
                                    </Text>
                                </View>
                                <Text style={styles.itemTotal}>
                                    ₹{item.quantity * item.pricePerUnit}
                                </Text>
                            </View>
                        ))}
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₹{order.total}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Info */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="card-outline" size={20} color={BrandColors.primary} />
                        <Text style={styles.sectionTitle}>Payment</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Method</Text>
                            <Text style={styles.paymentValue}>{order.paymentMethod}</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Status</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Paid</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notes */}
                {order.notes && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="document-text-outline" size={20} color={BrandColors.primary} />
                            <Text style={styles.sectionTitle}>Order Notes</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.notesText}>{order.notes}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomBar}>
                <Button
                    title="View All Orders"
                    onPress={handleViewOrders}
                    fullWidth
                />
                <Button
                    title="Continue Shopping"
                    onPress={handleContinueShopping}
                    variant="outline"
                    fullWidth
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: 150,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
    },
    errorText: {
        fontSize: 18,
        color: BrandColors.textSecondary,
    },
    header: {
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    successIcon: {
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: 15,
        color: BrandColors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    orderIdCard: {
        backgroundColor: BrandColors.primary,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    orderIdLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    orderIdValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: Spacing.xs,
    },
    orderDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginTop: Spacing.sm,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    card: {
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    deliveryDate: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    deliveryNote: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        marginTop: Spacing.xs,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: BrandColors.border,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        color: BrandColors.textPrimary,
    },
    itemQty: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: BrandColors.border,
        marginVertical: Spacing.sm,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: BrandColors.primary,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    paymentLabel: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    paymentValue: {
        fontSize: 14,
        fontWeight: '500',
        color: BrandColors.textPrimary,
    },
    statusBadge: {
        backgroundColor: BrandColors.primary + '20',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.sm,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: BrandColors.primary,
    },
    notesText: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        lineHeight: 20,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.md,
        paddingBottom: Spacing.lg,
        backgroundColor: BrandColors.card,
        borderTopWidth: 1,
        borderTopColor: BrandColors.border,
        gap: Spacing.sm,
    },
});
