// Search Bar Component

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onSubmit?: () => void;
}

export function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search fruits...',
    onSubmit
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={BrandColors.textSecondary} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={BrandColors.textSecondary}
                returnKeyType="search"
                onSubmitEditing={onSubmit}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <Ionicons name="close-circle" size={20} color={BrandColors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.inputBg,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm + 2,
        marginHorizontal: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: BrandColors.border,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: BrandColors.textPrimary,
        marginLeft: Spacing.sm,
        marginRight: Spacing.sm,
    },
});
