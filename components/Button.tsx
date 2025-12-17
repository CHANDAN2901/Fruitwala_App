// Reusable Button Component

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle
} from 'react-native';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
}: ButtonProps) {
    const buttonStyles = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        disabled && styles.textDisabled,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? BrandColors.primary : '#FFFFFF'}
                    size="small"
                />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    // Variants
    primary: {
        backgroundColor: BrandColors.primary,
    },
    secondary: {
        backgroundColor: BrandColors.info,
    },
    danger: {
        backgroundColor: BrandColors.danger,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: BrandColors.primary,
    },

    // Sizes
    size_sm: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    size_md: {
        paddingVertical: Spacing.md - 4,
        paddingHorizontal: Spacing.lg,
    },
    size_lg: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },

    // Text styles
    text: {
        fontWeight: '600',
    },
    text_primary: {
        color: '#FFFFFF',
    },
    text_secondary: {
        color: '#FFFFFF',
    },
    text_danger: {
        color: '#FFFFFF',
    },
    text_outline: {
        color: BrandColors.primary,
    },
    text_sm: {
        fontSize: 14,
    },
    text_md: {
        fontSize: 16,
    },
    text_lg: {
        fontSize: 18,
    },
    textDisabled: {
        opacity: 0.7,
    },
});
