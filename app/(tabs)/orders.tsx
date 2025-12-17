// Orders Screen - Order history

import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useOrders } from '@/contexts/OrderContext';
import { Order } from '@/types';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

function OrderCard({ order }: { order: Order }) {
    const statusColors = {
        Placed: BrandColors.info,
        Processing: BrandColors.accent,
        Delivered: BrandColors.primary,
        Cancelled: BrandColors.danger,
    };

    const statusColor = statusColors[order.status];
    const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    const deliveryDate = new Date(order.deliveryDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
    });

    return (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>#{order.id}</Text>
                    <Text style={styles.orderDate}>{orderDate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>{order.status}</Text>
                </View>
            </View>

            <View style={styles.orderItems}>
                {order.items.slice(0, 2).map((item, index) => (
                    <Text key={index} style={styles.itemText} numberOfLines={1}>
                        {item.quantity} × {item.productName}
                    </Text>
                ))}
                {order.items.length > 2 && (
                    <Text style={styles.moreItems}>+{order.items.length - 2} more items</Text>
                )}
            </View>

            <View style={styles.orderFooter}>
                <View style={styles.deliveryInfo}>
                    <Ionicons name="calendar-outline" size={14} color={BrandColors.textSecondary} />
                    <Text style={styles.deliveryText}>Delivery: {deliveryDate}</Text>
                </View>
                <Text style={styles.orderTotal}>₹{order.total}</Text>
            </View>
        </View>
    );
}

export default function OrdersScreen() {
    const { orders } = useOrders();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Your Orders</Text>
                <Text style={styles.subtitle}>{orders.length} orders</Text>
            </View>

            {orders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="receipt-outline" size={80} color={BrandColors.textSecondary} />
                    <Text style={styles.emptyTitle}>No orders yet</Text>
                    <Text style={styles.emptySubtext}>
                        Your order history will appear here
                    </Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BrandColors.background,
    },
    header: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    subtitle: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        gap: Spacing.md,
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
    orderCard: {
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    orderId: {
        fontSize: 16,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    orderDate: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    statusBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    orderItems: {
        paddingVertical: Spacing.sm,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: BrandColors.border,
        marginVertical: Spacing.sm,
    },
    itemText: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        marginBottom: 2,
    },
    moreItems: {
        fontSize: 12,
        color: BrandColors.primary,
        fontWeight: '500',
        marginTop: 4,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deliveryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryText: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginLeft: 4,
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: '700',
        color: BrandColors.primary,
    },
});
