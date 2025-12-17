// Dummy product data for Fruit Wholesale App

import { Product } from '@/types';

export const products: Product[] = [
    // Best Sellers
    {
        id: '1',
        name: 'Royal Alphonso Mango',
        category: 'Seasonal',
        pricePerUnit: 450,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
        isBestSeller: true,
        description: 'Premium Alphonso mangoes from Ratnagiri. Sweet, aromatic, and perfect for bulk orders.',
        stock: 500,
    },
    {
        id: '2',
        name: 'Fresh Bananas',
        category: 'Seasonal',
        pricePerUnit: 60,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
        isBestSeller: true,
        description: 'Farm-fresh bananas, ideal for restaurants and cafes.',
        stock: 1000,
    },
    {
        id: '3',
        name: 'Washington Apples',
        category: 'Imported',
        pricePerUnit: 280,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
        isBestSeller: true,
        description: 'Crisp and sweet Washington apples, imported fresh.',
        stock: 300,
    },
    {
        id: '4',
        name: 'California Oranges',
        category: 'Imported',
        pricePerUnit: 180,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400',
        isBestSeller: true,
        description: 'Juicy California oranges, perfect for juice bars.',
        stock: 400,
    },
    // Seasonal Fruits
    {
        id: '5',
        name: 'Watermelon',
        category: 'Seasonal',
        pricePerUnit: 35,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
        isBestSeller: false,
        description: 'Sweet and refreshing watermelons, summer special.',
        stock: 800,
    },
    {
        id: '6',
        name: 'Papaya',
        category: 'Seasonal',
        pricePerUnit: 55,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400',
        isBestSeller: false,
        description: 'Ripe papayas, great for hotels and restaurants.',
        stock: 350,
    },
    {
        id: '7',
        name: 'Sweet Lime (Mosambi)',
        category: 'Seasonal',
        pricePerUnit: 80,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400',
        isBestSeller: false,
        description: 'Fresh sweet limes, perfect for fresh juice.',
        stock: 450,
    },
    {
        id: '8',
        name: 'Pomegranate',
        category: 'Seasonal',
        pricePerUnit: 200,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=400',
        isBestSeller: false,
        description: 'Ruby red pomegranates with juicy seeds.',
        stock: 250,
    },
    // Imported Fruits
    {
        id: '9',
        name: 'Green Kiwi',
        category: 'Imported',
        pricePerUnit: 350,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400',
        isBestSeller: false,
        description: 'Fresh New Zealand kiwis, tangy and nutritious.',
        stock: 150,
    },
    {
        id: '10',
        name: 'Blueberries',
        category: 'Imported',
        pricePerUnit: 800,
        unit: 'box',
        imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
        isBestSeller: false,
        description: 'Premium blueberries, packed fresh. 125g per box.',
        stock: 200,
    },
    {
        id: '11',
        name: 'Red Grapes',
        category: 'Imported',
        pricePerUnit: 180,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400',
        isBestSeller: false,
        description: 'Sweet seedless red grapes from Chile.',
        stock: 300,
    },
    // Exotic Fruits
    {
        id: '12',
        name: 'Dragon Fruit',
        category: 'Exotic',
        pricePerUnit: 400,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=400',
        isBestSeller: false,
        description: 'Vibrant pink dragon fruit, perfect for premium presentations.',
        stock: 100,
    },
    {
        id: '13',
        name: 'Passion Fruit',
        category: 'Exotic',
        pricePerUnit: 500,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=400',
        isBestSeller: false,
        description: 'Aromatic passion fruits for desserts and drinks.',
        stock: 80,
    },
    {
        id: '14',
        name: 'Avocado',
        category: 'Exotic',
        pricePerUnit: 350,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
        isBestSeller: true,
        description: 'Creamy Hass avocados, cafe favorite.',
        stock: 200,
    },
    {
        id: '15',
        name: 'Fresh Figs',
        category: 'Exotic',
        pricePerUnit: 600,
        unit: 'kg',
        imageUrl: 'https://images.unsplash.com/photo-1601379760883-1bb497c558f0?w=400',
        isBestSeller: false,
        description: 'Delicate fresh figs, limited seasonal availability.',
        stock: 50,
    },
];

// Helper functions
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getSeasonalFruits = () => products.filter(p => p.category === 'Seasonal');
export const getImportedFruits = () => products.filter(p => p.category === 'Imported');
export const getExoticFruits = () => products.filter(p => p.category === 'Exotic');
export const getProductById = (id: string) => products.find(p => p.id === id);
export const searchProducts = (query: string) =>
    products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
