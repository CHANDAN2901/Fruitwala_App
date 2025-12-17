// Offer banners for carousel

import { Offer } from '@/types';

export const offers: Offer[] = [
    {
        id: '1',
        title: '35% Discount',
        subtitle: '100% Guaranteed all Fresh\nGrocery Items',
        backgroundColor: '#1E5631',
        textColor: '#FFFFFF',
        discount: '35% OFF',
    },
    {
        id: '2',
        title: 'Bulk Order Special',
        subtitle: 'Order 100kg+ and save extra 10%',
        backgroundColor: '#2D7A46',
        textColor: '#FFFFFF',
        discount: '10% EXTRA',
    },
    {
        id: '3',
        title: 'Fresh Imports',
        subtitle: 'New batch of exotic fruits arrived',
        backgroundColor: '#143D22',
        textColor: '#FFFFFF',
    },
    {
        id: '4',
        title: 'Free Delivery',
        subtitle: 'On orders above ₹5000',
        backgroundColor: '#FF9800',
        textColor: '#FFFFFF',
        discount: 'FREE',
    },
];
