/**
 * Fruit Wholesale App - Theme Configuration
 * Premium clean design with dark forest green accents
 */

import { Platform } from 'react-native';

// Brand Colors - Premium Clean Design
export const BrandColors = {
  // Primary - Dark Forest Green (for CTAs, active states)
  primary: '#1E5631',
  primaryLight: '#2D7A46',
  primaryDark: '#143D22',

  // Secondary - Light Mint (for icon backgrounds, subtle accents)  
  secondary: '#E8F5E9',
  secondaryMint: '#C8E6C9',

  // Accent - Warm Orange (for offers, badges)
  accent: '#FF9800',
  accentLight: '#FFE0B2',

  // Backgrounds
  background: '#FFFFFF',      // Pure white
  backgroundGray: '#F8F9FA',  // Very light gray for sections
  card: '#FFFFFF',            // White cards

  // Text
  textPrimary: '#1A1A1A',     // Near black
  textSecondary: '#6B7280',   // Medium gray
  textLight: '#9CA3AF',       // Light gray

  // UI Elements
  danger: '#EF4444',
  success: '#22C55E',
  info: '#3B82F6',
  warning: '#F59E0B',

  // Borders and dividers
  border: '#E5E7EB',
  divider: '#F3F4F6',
  inputBg: '#F9FAFB',

  // Tab bar
  tabBarBg: '#1E5631',
  tabBarActive: '#FFFFFF',
  tabBarInactive: 'rgba(255,255,255,0.6)',
};

// Theme for light/dark mode
const tintColorLight = BrandColors.primary;
const tintColorDark = '#4ADE80';

export const Colors = {
  light: {
    text: BrandColors.textPrimary,
    textSecondary: BrandColors.textSecondary,
    background: BrandColors.background,
    card: BrandColors.card,
    tint: tintColorLight,
    icon: BrandColors.textSecondary,
    tabIconDefault: BrandColors.tabBarInactive,
    tabIconSelected: BrandColors.tabBarActive,
    border: BrandColors.border,
    primary: BrandColors.primary,
    accent: BrandColors.accent,
    danger: BrandColors.danger,
    info: BrandColors.info,
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#0F172A',
    card: '#1E293B',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#334155',
    primary: '#4ADE80',
    accent: '#FDE047',
    danger: '#F87171',
    info: '#60A5FA',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius - More rounded for premium feel
export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 9999,
};

// Shadows for cards
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};


