// Cart Context - Manages shopping cart state

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@fruitwala_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from AsyncStorage on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
                if (storedCart) {
                    setItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };
        loadCart();
    }, []);

    // Save cart to AsyncStorage whenever it changes
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        };
        saveCart();
    }, [items]);

    const addToCart = useCallback((product: Product, quantity: number) => {
        setItems(currentItems => {
            const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

            if (existingIndex >= 0) {
                // Update existing item quantity
                const newItems = [...currentItems];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + quantity,
                };
                return newItems;
            } else {
                // Add new item
                return [...currentItems, { product, quantity }];
            }
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getTotal = useCallback(() => {
        return items.reduce((sum, item) => sum + (item.product.pricePerUnit * item.quantity), 0);
    }, [items]);

    const getItemCount = useCallback(() => {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotal,
            getItemCount,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
