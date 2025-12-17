// Profile Screen - User profile and settings

import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
}

function MenuItem({ icon, title, subtitle, onPress }: MenuItemProps) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuIcon}>
                <Ionicons name={icon} size={22} color={BrandColors.primary} />
            </View>
            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color={BrandColors.textSecondary} />
        </TouchableOpacity>
    );
}

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: logout,
                },
            ]
        );
    };

    const handleMenuItem = (item: string) => {
        Alert.alert('Coming Soon', `${item} feature will be available soon!`);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>

                {/* User Info */}
                <View style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons
                                name={user?.isGuest ? 'person-outline' : 'person'}
                                size={32}
                                color={BrandColors.primary}
                            />
                        </View>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            {user?.isGuest ? 'Guest User' : user?.email.split('@')[0]}
                        </Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                        {user?.isGuest && (
                            <View style={styles.guestBadge}>
                                <Text style={styles.guestBadgeText}>Guest Mode</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="person-outline"
                            title="Edit Profile"
                            subtitle="Update your details"
                            onPress={() => handleMenuItem('Edit Profile')}
                        />
                        <MenuItem
                            icon="location-outline"
                            title="Delivery Addresses"
                            subtitle="Manage saved addresses"
                            onPress={() => handleMenuItem('Delivery Addresses')}
                        />
                        <MenuItem
                            icon="card-outline"
                            title="Payment Methods"
                            subtitle="Cards, UPI, Wallets"
                            onPress={() => handleMenuItem('Payment Methods')}
                        />
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="help-circle-outline"
                            title="Help & FAQ"
                            onPress={() => handleMenuItem('Help & FAQ')}
                        />
                        <MenuItem
                            icon="chatbubble-outline"
                            title="Contact Us"
                            onPress={() => handleMenuItem('Contact Us')}
                        />
                        <MenuItem
                            icon="document-text-outline"
                            title="Terms & Privacy"
                            onPress={() => handleMenuItem('Terms & Privacy')}
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <View style={styles.logoutSection}>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        variant="danger"
                        fullWidth
                    />
                </View>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Fruitwala v1.0.0</Text>
                    <Text style={styles.tagline}>Fresh Fruits for Your Business</Text>
                </View>
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
    header: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: BrandColors.textPrimary,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.card,
        marginHorizontal: Spacing.md,
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    avatarContainer: {
        marginRight: Spacing.md,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: BrandColors.textPrimary,
    },
    userEmail: {
        fontSize: 14,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    guestBadge: {
        backgroundColor: BrandColors.accent + '30',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
        marginTop: Spacing.xs,
    },
    guestBadgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#B45309',
    },
    menuSection: {
        marginTop: Spacing.lg,
        paddingHorizontal: Spacing.md,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textSecondary,
        marginBottom: Spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    menuCard: {
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: BrandColors.border,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: BrandColors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: BrandColors.textPrimary,
    },
    menuSubtitle: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginTop: 2,
    },
    logoutSection: {
        padding: Spacing.md,
        marginTop: Spacing.lg,
    },
    versionContainer: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    versionText: {
        fontSize: 12,
        color: BrandColors.textSecondary,
    },
    tagline: {
        fontSize: 11,
        color: BrandColors.textSecondary,
        marginTop: 4,
    },
});
