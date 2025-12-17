// Categories Screen - Browse all fruits with filters

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { products, searchProducts } from '@/data/products';
import { ProductCategory } from '@/types';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

type FilterOption = 'All' | ProductCategory;

const FILTERS: FilterOption[] = ['All', 'Seasonal', 'Imported', 'Exotic'];

export default function CategoriesScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

    // Filter products
    let filteredProducts = searchQuery
        ? searchProducts(searchQuery)
        : products;

    if (activeFilter !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === activeFilter);
    }

    // Sort products
    filteredProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        return a.pricePerUnit - b.pricePerUnit;
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>All Categories</Text>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setSortBy(sortBy === 'name' ? 'price' : 'name')}
                >
                    <Ionicons name="swap-vertical" size={20} color={BrandColors.primary} />
                    <Text style={styles.sortText}>
                        {sortBy === 'name' ? 'A-Z' : 'Price'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Search */}
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search in categories..."
            />

            {/* Filter Chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={styles.filterContent}
            >
                {FILTERS.map(filter => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterChip,
                            activeFilter === filter && styles.filterChipActive,
                        ]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[
                            styles.filterText,
                            activeFilter === filter && styles.filterTextActive,
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Results Count */}
            <View style={styles.resultsInfo}>
                <Text style={styles.resultsText}>
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </Text>
            </View>

            {/* Product Grid */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productGrid}
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="leaf-outline" size={48} color={BrandColors.textSecondary} />
                        <Text style={styles.emptyText}>No products found</Text>
                        <Text style={styles.emptySubtext}>Try a different search or filter</Text>
                    </View>
                )}
            </ScrollView>
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
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.card,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: BrandColors.border,
    },
    sortText: {
        fontSize: 13,
        color: BrandColors.primary,
        marginLeft: 4,
        fontWeight: '500',
    },
    filterContainer: {
        maxHeight: 44,
    },
    filterContent: {
        paddingHorizontal: Spacing.md,
        gap: Spacing.sm,
    },
    filterChip: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        backgroundColor: BrandColors.card,
        borderWidth: 1,
        borderColor: BrandColors.border,
        marginRight: Spacing.sm,
    },
    filterChipActive: {
        backgroundColor: BrandColors.primary,
        borderColor: BrandColors.primary,
    },
    filterText: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    resultsInfo: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    resultsText: {
        fontSize: 13,
        color: BrandColors.textSecondary,
    },
    scrollView: {
        flex: 1,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Spacing.md,
        justifyContent: 'space-between',
        paddingBottom: Spacing.xxl,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl * 2,
        width: '100%',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textSecondary,
        marginTop: Spacing.md,
    },
    emptySubtext: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginTop: Spacing.xs,
    },
});
