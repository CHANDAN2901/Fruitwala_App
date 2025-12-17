// Auth Context - Manages dummy authentication state

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    loginAsGuest: () => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@fruitwala_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth state from AsyncStorage on mount
    useEffect(() => {
        const loadAuth = async () => {
            try {
                const storedAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
                if (storedAuth) {
                    setUser(JSON.parse(storedAuth));
                }
            } catch (error) {
                console.error('Error loading auth:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadAuth();
    }, []);

    // Save auth state to AsyncStorage whenever it changes
    useEffect(() => {
        const saveAuth = async () => {
            try {
                if (user) {
                    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
                } else {
                    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Error saving auth:', error);
            }
        };
        if (!isLoading) {
            saveAuth();
        }
    }, [user, isLoading]);

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        // Dummy login - accept any email/password
        // In a real app, this would validate against a backend
        if (email && password) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                email,
                isGuest: false,
            };
            setUser(newUser);
            return true;
        }
        return false;
    }, []);

    const loginAsGuest = useCallback(() => {
        const guestUser: User = {
            id: `guest_${Date.now()}`,
            email: 'guest@fruitwala.com',
            isGuest: true,
        };
        setUser(guestUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            loginAsGuest,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
