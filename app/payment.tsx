// Payment Screen - Mock payment flow

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { PaymentMethod } from '@/types';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

type PaymentState = 'processing' | 'success' | 'failed';

export default function PaymentScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        deliveryDate: string;
        notes: string;
        paymentMethod: string;
        grandTotal: string;
    }>();

    const { items, clearCart } = useCart();
    const { placeOrder } = useOrders();

    const [paymentState, setPaymentState] = useState<PaymentState>('processing');
    const [orderId, setOrderId] = useState<string>('');

    useEffect(() => {
        // Simulate payment processing
        const timer = setTimeout(() => {
            // 90% success rate for demo
            const isSuccess = Math.random() > 0.1;

            if (isSuccess && items.length > 0) {
                // Place order
                const order = placeOrder(
                    items,
                    params.deliveryDate || new Date().toISOString(),
                    (params.paymentMethod as PaymentMethod) || 'UPI',
                    params.notes
                );
                setOrderId(order.id);
                clearCart();
                setPaymentState('success');
            } else if (items.length === 0) {
                setPaymentState('failed');
            } else {
                setPaymentState('failed');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        setPaymentState('processing');
        // Retry after 2 seconds
        setTimeout(() => {
            const order = placeOrder(
                items,
                params.deliveryDate || new Date().toISOString(),
                (params.paymentMethod as PaymentMethod) || 'UPI',
                params.notes
            );
            setOrderId(order.id);
            clearCart();
            setPaymentState('success');
        }, 2500);
    };

    const handleViewOrder = () => {
        router.replace({
            pathname: '/order-confirmation',
            params: { orderId },
        });
    };

    const handleGoHome = () => {
        router.replace('/');
    };

    if (paymentState === 'processing') {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.processingIcon}>
                        <ActivityIndicator size="large" color={BrandColors.primary} />
                    </View>
                    <Text style={styles.title}>Processing Payment</Text>
                    <Text style={styles.subtitle}>
                        Please wait while we process your {params.paymentMethod} payment...
                    </Text>
                    <Text style={styles.amount}>₹{params.grandTotal}</Text>

                    <View style={styles.securityNote}>
                        <Ionicons name="shield-checkmark" size={16} color={BrandColors.textSecondary} />
                        <Text style={styles.securityText}>Secure payment processing</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    if (paymentState === 'failed') {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.resultIcon, styles.failedIcon]}>
                        <Ionicons name="close" size={48} color="#FFFFFF" />
                    </View>
                    <Text style={styles.title}>Payment Failed</Text>
                    <Text style={styles.subtitle}>
                        Something went wrong with your payment. Please try again.
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Try Again"
                            onPress={handleRetry}
                            fullWidth
                            size="lg"
                        />
                        <Button
                            title="Go Back"
                            onPress={() => router.back()}
                            variant="outline"
                            fullWidth
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.resultIcon, styles.successIcon]}>
                    <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                </View>
                <Text style={styles.title}>Payment Successful!</Text>
                <Text style={styles.subtitle}>
                    Your order has been placed successfully.
                </Text>
                <Text style={styles.orderId}>Order ID: {orderId}</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="View Order Details"
                        onPress={handleViewOrder}
                        fullWidth
                        size="lg"
                    />
                    <Button
                        title="Continue Shopping"
                        onPress={handleGoHome}
                        variant="outline"
                        fullWidth
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BrandColors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.lg,
    },
    processingIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: BrandColors.card,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    resultIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    successIcon: {
        backgroundColor: BrandColors.primary,
    },
    failedIcon: {
        backgroundColor: BrandColors.danger,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: BrandColors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.md,
        lineHeight: 22,
    },
    amount: {
        fontSize: 36,
        fontWeight: '700',
        color: BrandColors.primary,
        marginVertical: Spacing.lg,
    },
    orderId: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        backgroundColor: BrandColors.card,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.lg,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        marginTop: Spacing.xl,
    },
    securityText: {
        fontSize: 13,
        color: BrandColors.textSecondary,
    },
    buttonContainer: {
        width: '100%',
        gap: Spacing.md,
        marginTop: Spacing.lg,
    },
});
