// Order Context - Manages order history

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderItem, PaymentMethod, CartItem } from '@/types';

interface OrderContextType {
    orders: Order[];
    placeOrder: (
        items: CartItem[],
        deliveryDate: string,
        paymentMethod: PaymentMethod,
        notes?: string
    ) => Order;
    getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = '@fruitwala_orders';

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);

    // Load orders from AsyncStorage on mount
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
                if (storedOrders) {
                    setOrders(JSON.parse(storedOrders));
                }
            } catch (error) {
                console.error('Error loading orders:', error);
            }
        };
        loadOrders();
    }, []);

    // Save orders to AsyncStorage whenever they change
    useEffect(() => {
        const saveOrders = async () => {
            try {
                await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
            } catch (error) {
                console.error('Error saving orders:', error);
            }
        };
        saveOrders();
    }, [orders]);

    const placeOrder = useCallback((
        cartItems: CartItem[],
        deliveryDate: string,
        paymentMethod: PaymentMethod,
        notes?: string
    ): Order => {
        const orderItems: OrderItem[] = cartItems.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            pricePerUnit: item.product.pricePerUnit,
            unit: item.product.unit,
        }));

        const total = cartItems.reduce(
            (sum, item) => sum + (item.product.pricePerUnit * item.quantity),
            0
        );

        const newOrder: Order = {
            id: `ORD${Date.now()}`,
            items: orderItems,
            total,
            status: 'Placed',
            date: new Date().toISOString(),
            deliveryDate,
            notes,
            paymentMethod,
        };

        setOrders(currentOrders => [newOrder, ...currentOrders]);
        return newOrder;
    }, []);

    const getOrderById = useCallback((orderId: string) => {
        return orders.find(order => order.id === orderId);
    }, [orders]);

    return (
        <OrderContext.Provider value={{
            orders,
            placeOrder,
            getOrderById,
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
