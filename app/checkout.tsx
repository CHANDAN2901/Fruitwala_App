// Checkout Screen

import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { PaymentMethod } from '@/types';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'UPI', label: 'UPI Payment', icon: 'phone-portrait-outline' },
    { id: 'Card', label: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'Cash', label: 'Cash on Delivery', icon: 'cash-outline' },
];

export default function CheckoutScreen() {
    const router = useRouter();
    const { items, getTotal } = useCart();

    const [deliveryDate, setDeliveryDate] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

    const total = getTotal();
    const deliveryCharge = total >= 5000 ? 0 : 100;
    const grandTotal = total + deliveryCharge;

    // Generate delivery date options (next 7 days)
    const getDeliveryDates = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push({
                value: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                }),
            });
        }
        return dates;
    };

    const deliveryDates = getDeliveryDates();

    const handleProceedToPayment = () => {
        if (!deliveryDate) {
            Alert.alert('Select Delivery Date', 'Please select a delivery date to proceed.');
            return;
        }

        router.push({
            pathname: '/payment',
            params: {
                deliveryDate,
                notes,
                paymentMethod,
                grandTotal: String(grandTotal),
            },
        });
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={64} color={BrandColors.textSecondary} />
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Button title="Browse Products" onPress={() => router.push('/(tabs)/categories')} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.card}>
                        {items.map(item => (
                            <View key={item.product.id} style={styles.orderItem}>
                                <Text style={styles.itemName} numberOfLines={1}>
                                    {item.product.name}
                                </Text>
                                <Text style={styles.itemQty}>
                                    {item.quantity} {item.product.unit}
                                </Text>
                                <Text style={styles.itemPrice}>
                                    ₹{item.product.pricePerUnit * item.quantity}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Delivery Date */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Date</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateContainer}
                    >
                        {deliveryDates.map(date => (
                            <TouchableOpacity
                                key={date.value}
                                style={[
                                    styles.dateOption,
                                    deliveryDate === date.value && styles.dateOptionActive,
                                ]}
                                onPress={() => setDeliveryDate(date.value)}
                            >
                                <Text style={[
                                    styles.dateText,
                                    deliveryDate === date.value && styles.dateTextActive,
                                ]}>
                                    {date.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Order Notes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Notes (Optional)</Text>
                    <TextInput
                        style={styles.notesInput}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Any special instructions for your order..."
                        placeholderTextColor={BrandColors.textSecondary}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.card}>
                        {PAYMENT_METHODS.map(method => (
                            <TouchableOpacity
                                key={method.id}
                                style={styles.paymentOption}
                                onPress={() => setPaymentMethod(method.id)}
                            >
                                <View style={styles.paymentLeft}>
                                    <Ionicons name={method.icon} size={24} color={BrandColors.textSecondary} />
                                    <Text style={styles.paymentLabel}>{method.label}</Text>
                                </View>
                                <Ionicons
                                    name={paymentMethod === method.id ? 'radio-button-on' : 'radio-button-off'}
                                    size={22}
                                    color={paymentMethod === method.id ? BrandColors.primary : BrandColors.textSecondary}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Pricing Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Price Details</Text>
                    <View style={styles.card}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Subtotal</Text>
                            <Text style={styles.priceValue}>₹{total}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Delivery Charges</Text>
                            <Text style={[styles.priceValue, deliveryCharge === 0 && styles.freeDelivery]}>
                                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                            </Text>
                        </View>
                        {deliveryCharge > 0 && (
                            <Text style={styles.freeDeliveryHint}>
                                Add ₹{5000 - total} more for free delivery
                            </Text>
                        )}
                        <View style={styles.divider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.grandTotalLabel}>Grand Total</Text>
                            <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomBar}>
                <Button
                    title="Proceed to Payment"
                    onPress={handleProceedToPayment}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.md,
    },
    emptyText: {
        fontSize: 18,
        color: BrandColors.textSecondary,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.sm,
    },
    card: {
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: BrandColors.border,
    },
    itemName: {
        flex: 1,
        fontSize: 14,
        color: BrandColors.textPrimary,
    },
    itemQty: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        marginHorizontal: Spacing.sm,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    dateContainer: {
        gap: Spacing.sm,
    },
    dateOption: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        backgroundColor: BrandColors.card,
        borderWidth: 1,
        borderColor: BrandColors.border,
        marginRight: Spacing.sm,
    },
    dateOptionActive: {
        backgroundColor: BrandColors.primary,
        borderColor: BrandColors.primary,
    },
    dateText: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        fontWeight: '500',
    },
    dateTextActive: {
        color: '#FFFFFF',
    },
    notesInput: {
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        fontSize: 14,
        color: BrandColors.textPrimary,
        minHeight: 80,
        borderWidth: 1,
        borderColor: BrandColors.border,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: BrandColors.border,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    paymentLabel: {
        fontSize: 15,
        color: BrandColors.textPrimary,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    priceLabel: {
        fontSize: 14,
        color: BrandColors.textSecondary,
    },
    priceValue: {
        fontSize: 14,
        color: BrandColors.textPrimary,
        fontWeight: '500',
    },
    freeDelivery: {
        color: BrandColors.primary,
    },
    freeDeliveryHint: {
        fontSize: 12,
        color: BrandColors.accent,
        fontStyle: 'italic',
        marginBottom: Spacing.sm,
    },
    divider: {
        height: 1,
        backgroundColor: BrandColors.border,
        marginVertical: Spacing.sm,
    },
    grandTotalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    grandTotalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: BrandColors.primary,
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
    },
});
