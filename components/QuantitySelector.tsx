// Quantity Selector Component - Bulk-friendly quantity input

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
}

export function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 999,
    step = 1,
    unit,
}: QuantitySelectorProps) {
    const decrease = () => {
        const newValue = Math.max(min, value - step);
        onChange(newValue);
    };

    const increase = () => {
        const newValue = Math.min(max, value + step);
        onChange(newValue);
    };

    const handleInputChange = (text: string) => {
        const numValue = parseInt(text, 10);
        if (!isNaN(numValue)) {
            const clampedValue = Math.max(min, Math.min(max, numValue));
            onChange(clampedValue);
        } else if (text === '') {
            onChange(min);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, value <= min && styles.buttonDisabled]}
                onPress={decrease}
                disabled={value <= min}
            >
                <Ionicons
                    name="remove"
                    size={20}
                    color={value <= min ? BrandColors.textSecondary : BrandColors.primary}
                />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={String(value)}
                    onChangeText={handleInputChange}
                    keyboardType="number-pad"
                    selectTextOnFocus
                />
                {unit && <Text style={styles.unit}>{unit}</Text>}
            </View>

            <TouchableOpacity
                style={[styles.button, value >= max && styles.buttonDisabled]}
                onPress={increase}
                disabled={value >= max}
            >
                <Ionicons
                    name="add"
                    size={20}
                    color={value >= max ? BrandColors.textSecondary : BrandColors.primary}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.inputBg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: BrandColors.border,
        overflow: 'hidden',
    },
    button: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BrandColors.card,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.sm,
    },
    input: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textPrimary,
        textAlign: 'center',
        minWidth: 40,
    },
    unit: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginLeft: 4,
    },
});
