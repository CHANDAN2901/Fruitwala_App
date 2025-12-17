// Section Header Component

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Spacing } from '@/constants/theme';

interface SectionHeaderProps {
    title: string;
    onViewAll?: () => void;
    viewAllText?: string;
}

export function SectionHeader({
    title,
    onViewAll,
    viewAllText = 'View All'
}: SectionHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {onViewAll && (
                <TouchableOpacity style={styles.viewAll} onPress={onViewAll}>
                    <Text style={styles.viewAllText}>{viewAllText}</Text>
                    <Ionicons name="chevron-forward" size={16} color={BrandColors.primary} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.md,
        marginTop: Spacing.sm,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        fontSize: 14,
        color: BrandColors.primary,
        fontWeight: '500',
    },
});
