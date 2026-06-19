/**
 * Sage Green Theme Color Palette
 */

export const SAGE_COLORS = {
  // Primary Sage Colors
  sage50: '#F5F8F3',
  sage100: '#E8F0E3',
  sage200: '#D1E2C7',
  sage300: '#B8D4A8',
  sage400: '#9BB57C',
  sage500: '#87A96B',
  sage600: '#6B8B56',
  sage700: '#5F7C56',
  sage800: '#4A6741',
  sage900: '#3A5234',
  sage950: '#2A3D26',

  // Secondary Colors
  emerald500: '#10B981',
  emerald400: '#34D399',
  emerald600: '#059669',

  rose500: '#F43F5E',
  rose400: '#FB7185',
  rose600: '#E11D48',

  amber500: '#F59E0B',
  amber400: '#FBBF24',
  amber600: '#D97706',

  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan600: '#0891B2',

  // Neutral/Slate Colors
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  slate950: '#020617',
} as const

/**
 * Theme tokens for consistent usage
 */
export const THEME_TOKENS = {
  primary: SAGE_COLORS.sage500,
  primaryLight: SAGE_COLORS.sage400,
  primaryDark: SAGE_COLORS.sage600,

  success: SAGE_COLORS.emerald500,
  error: SAGE_COLORS.rose500,
  warning: SAGE_COLORS.amber500,
  info: SAGE_COLORS.cyan500,

  background: SAGE_COLORS.slate950,
  surface: SAGE_COLORS.slate900,
  surfaceLight: SAGE_COLORS.slate800,

  text: '#FFFFFF',
  textSecondary: SAGE_COLORS.slate400,
  textTertiary: SAGE_COLORS.slate600,

  border: SAGE_COLORS.slate800,
  borderLight: SAGE_COLORS.slate700,

  shadow: 'rgba(0, 0, 0, 0.1)',
} as const

/**
 * Category Colors Mapping
 */
export const CATEGORY_COLORS = {
  'Makan & Minum': {
    light: '#FED7AA',
    main: '#FB923C',
    dark: '#EA580C',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
  },
  'Transportasi': {
    light: '#BAE6FD',
    main: '#0EA5E9',
    dark: '#0369A1',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
  },
  'Belanja': {
    light: '#FBCFE8',
    main: '#EC4899',
    dark: '#BE185D',
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
  },
  'Kesehatan': {
    light: '#BBEF63',
    main: '#84CC16',
    dark: '#65A30D',
    bg: 'bg-lime-500/10',
    text: 'text-lime-400',
  },
  'Hiburan': {
    light: '#D8B4FE',
    main: '#A78BFA',
    dark: '#7C3AED',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
  },
  'Pendidikan': {
    light: '#93C5FD',
    main: '#3B82F6',
    dark: '#1D4ED8',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  'Tagihan': {
    light: '#F0FCCF',
    main: '#EAB308',
    dark: '#CA8A04',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
  },
  'Lainnya': {
    light: '#CBD5E1',
    main: '#94A3B8',
    dark: '#475569',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
  },
} as const
