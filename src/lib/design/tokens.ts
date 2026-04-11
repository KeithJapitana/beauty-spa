/**
 * Airbnb Design System Tokens
 * Centralized design tokens for the beauty spa website
 */

export const colors = {
  // Neutral palette
  white: '#ffffff',
  black: '#222222', // Never pure black
  gray50: '#f7f7f7',
  gray100: '#e7e7e7',
  gray200: '#d1d1d1',
  gray300: '#b0b0b0',
  gray400: '#8a8a8a',
  gray500: '#717171',
  gray600: '#5c5c5c',
  gray700: '#484848',
  gray800: '#333333',
  gray900: '#222222',

  // Accent color (Rausch Red - Airbnb inspired)
  accent: '#ff385c',
  accentHover: '#d93250',
} as const

export const borderRadius = {
  button: '8px',
  card: '20px',
  nav: '9999px', // Full circle
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  card: '0 6px 16px 0 rgb(0 0 0 / 0.12), 0 1px 4px 0 rgb(0 0 0 / 0.08)',
  cardLg: '0 12px 32px 0 rgb(0 0 0 / 0.12), 0 2px 8px 0 rgb(0 0 0 / 0.08)',
  cardXl: '0 24px 48px 0 rgb(0 0 0 / 0.12), 0 4px 16px 0 rgb(0 0 0 / 0.08)',
  nav: '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const

export const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
} as const

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

export const transition = {
  default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Z-index scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const

// Breakpoints (for JS usage)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
