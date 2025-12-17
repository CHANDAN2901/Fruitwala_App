// Authentication Screen - Login / Guest Access

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { BrandColors, BorderRadius, Spacing } from '@/constants/theme';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login, loginAsGuest } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        setIsLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                router.replace('/');
            } else {
                Alert.alert('Error', 'Login failed. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = () => {
        loginAsGuest();
        router.replace('/');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                {/* Logo / Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="leaf" size={48} color={BrandColors.primary} />
                    </View>
                    <Text style={styles.title}>Fruitwala</Text>
                    <Text style={styles.subtitle}>Fresh Fruits for Your Business</Text>
                </View>

                {/* Login Form */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={BrandColors.textSecondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor={BrandColors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={BrandColors.textSecondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={BrandColors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoComplete="password"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={20}
                                color={BrandColors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={isLoading}
                        fullWidth
                        size="lg"
                    />

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <Button
                        title="Continue as Guest"
                        onPress={handleGuestLogin}
                        variant="outline"
                        fullWidth
                        size="lg"
                    />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        B2B Wholesale Platform
                    </Text>
                    <Text style={styles.footerSubtext}>
                        For retailers, hotels & restaurants
                    </Text>
                </View>
            </KeyboardAvoidingView>
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
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: BrandColors.textPrimary,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: BrandColors.textSecondary,
    },
    form: {
        gap: Spacing.md,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BrandColors.card,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        borderWidth: 1,
        borderColor: BrandColors.border,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        height: 52,
        fontSize: 16,
        color: BrandColors.textPrimary,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.md,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: BrandColors.border,
    },
    dividerText: {
        marginHorizontal: Spacing.md,
        color: BrandColors.textSecondary,
        fontSize: 14,
    },
    footer: {
        alignItems: 'center',
        marginTop: Spacing.xxl,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        color: BrandColors.textSecondary,
    },
    footerSubtext: {
        fontSize: 12,
        color: BrandColors.textSecondary,
        marginTop: Spacing.xs,
    },
});
