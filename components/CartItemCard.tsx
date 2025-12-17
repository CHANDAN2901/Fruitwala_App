// Cart Item Component - For displaying items in cart

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { CartItem as CartItemType } from '@/types';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
    item: CartItemType;
}

export function CartItemCard({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    const handleIncrease = () => {
        updateQuantity(product.id, quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    };

    const handleRemove = () => {
        removeFromCart(product.id);
    };

    const itemTotal = product.pricePerUnit * quantity;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                contentFit="cover"
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                    <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="trash-outline" size={18} color={BrandColors.danger} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.price}>
                    ₹{product.pricePerUnit}/{product.unit}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity style={styles.qtyButton} onPress={handleDecrease}>
                            <Ionicons name="remove" size={16} color={BrandColors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity style={styles.qtyButton} onPress={handleIncrease}>
                            <Ionicons name="add" size={16} color={BrandColors.primary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.total}>₹{itemTotal}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        marginHorizontal: Spacing.md,
        marginBottom: Spacing.md,
        padding: Spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.md,
    },
    content: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        flex: 1,
        marginRight: Spacing.sm,
    },
    price: {
        fontSize: 13,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.inputBg,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: BrandColors.border,
    },
    qtyButton: {
        padding: Spacing.sm,
    },
    quantity: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        minWidth: 30,
        textAlign: 'center',
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
        color: BrandColors.primary,
    },
});
