// Home Screen - Premium Clean Design

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { SearchBar } from '@/components/SearchBar';
import { OfferCarousel } from '@/components/OfferCarousel';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';
import { offers } from '@/data/offers';
import { getBestSellers, getSeasonalFruits, getImportedFruits, getExoticFruits, searchProducts } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';
import { BrandColors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const bestSellers = getBestSellers();
  const seasonalFruits = getSeasonalFruits();
  const importedFruits = getImportedFruits();
  const exoticFruits = getExoticFruits();
  const searchResults = searchQuery ? searchProducts(searchQuery) : [];

  const handleViewAllCategories = () => {
    router.push('/(tabs)/categories');
  };

  const userName = user?.isGuest ? 'Guest' : user?.email?.split('@')[0] || 'User';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={20} color={BrandColors.primary} />
            </View>
            <View>
              <Text style={styles.greeting}>Welcome</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={BrandColors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search here..."
        />

        {/* Search Results or Main Content */}
        {searchQuery ? (
          <View style={styles.searchResults}>
            <SectionHeader title={`Results for "${searchQuery}"`} />
            {searchResults.length > 0 ? (
              <View style={styles.productGrid}>
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color={BrandColors.textSecondary} />
                <Text style={styles.emptyText}>No fruits found</Text>
              </View>
            )}
          </View>
        ) : (
          <>
            {/* Category Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryChips}
            >
              <TouchableOpacity style={[styles.categoryChip, styles.categoryChipActive]}>
                <Ionicons name="apps" size={16} color="#FFFFFF" />
                <Text style={styles.categoryChipTextActive}>All</Text>
              </TouchableOpacity>
              {['Seasonal', 'Imported', 'Exotic'].map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={styles.categoryChip}
                  onPress={() => router.push('/(tabs)/categories')}
                >
                  <View style={styles.categoryIconBg}>
                    <Ionicons
                      name={cat === 'Seasonal' ? 'sunny-outline' : cat === 'Imported' ? 'airplane-outline' : 'leaf-outline'}
                      size={16}
                      color={BrandColors.primary}
                    />
                  </View>
                  <Text style={styles.categoryChipText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Special Offers */}
            <SectionHeader title="Special Offers" />
            <OfferCarousel offers={offers} />

            {/* Popular Items */}
            <SectionHeader title="Popular Items" onViewAll={handleViewAllCategories} />
            <FlatList
              data={bestSellers}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProductCard product={item} compact />}
            />

            {/* Seasonal Fruits */}
            <SectionHeader title="Seasonal Fruits" onViewAll={handleViewAllCategories} />
            <FlatList
              data={seasonalFruits.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProductCard product={item} compact />}
            />

            {/* Imported Fruits */}
            <SectionHeader title="Imported Fruits" onViewAll={handleViewAllCategories} />
            <FlatList
              data={importedFruits.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ProductCard product={item} compact />}
            />
          </>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for absolute tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BrandColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 12,
    color: BrandColors.textSecondary,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: BrandColors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BrandColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  categoryChips: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.card,
    marginRight: Spacing.sm,
    gap: Spacing.xs,
    ...Shadows.sm,
  },
  categoryChipActive: {
    backgroundColor: BrandColors.primary,
  },
  categoryIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BrandColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: BrandColors.textPrimary,
  },
  categoryChipTextActive: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  horizontalList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  searchResults: {
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    color: BrandColors.textSecondary,
    marginTop: Spacing.md,
  },
});
