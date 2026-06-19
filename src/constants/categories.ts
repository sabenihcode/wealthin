import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Heart,
  Music,
  BookOpen,
  FileText,
  MoreHorizontal,
} from 'lucide-react'
import type { CategoriesConfig, CategoryName } from '../types'

/**
 * Complete categories configuration dengan Sage Green theme
 */
export const CATEGORIES_CONFIG: CategoriesConfig = {
  'Makan & Minum': {
    color: 'bg-orange-500/10 text-orange-400',
    activeBg: 'bg-orange-600 text-white',
    icon: UtensilsCrossed,
    fill: '#FB923C',
  },
  'Transportasi': {
    color: 'bg-sky-500/10 text-sky-400',
    activeBg: 'bg-sky-600 text-white',
    icon: Car,
    fill: '#0EA5E9',
  },
  'Belanja': {
    color: 'bg-pink-500/10 text-pink-400',
    activeBg: 'bg-pink-600 text-white',
    icon: ShoppingBag,
    fill: '#EC4899',
  },
  'Kesehatan': {
    color: 'bg-lime-500/10 text-lime-400',
    activeBg: 'bg-lime-600 text-white',
    icon: Heart,
    fill: '#84CC16',
  },
  'Hiburan': {
    color: 'bg-violet-500/10 text-violet-400',
    activeBg: 'bg-violet-600 text-white',
    icon: Music,
    fill: '#A78BFA',
  },
  'Pendidikan': {
    color: 'bg-blue-500/10 text-blue-400',
    activeBg: 'bg-blue-600 text-white',
    icon: BookOpen,
    fill: '#3B82F6',
  },
  'Tagihan': {
    color: 'bg-yellow-500/10 text-yellow-400',
    activeBg: 'bg-yellow-600 text-white',
    icon: FileText,
    fill: '#EAB308',
  },
  'Lainnya': {
    color: 'bg-slate-500/10 text-slate-400',
    activeBg: 'bg-slate-600 text-white',
    icon: MoreHorizontal,
    fill: '#94A3B8',
  },
} as const

/**
 * Ordered list of category names
 */
export const CATEGORY_NAMES = Object.keys(
  CATEGORIES_CONFIG
) as CategoryName[]

/**
 * Get category config by name
 */
export function getCategoryConfig(name: CategoryName) {
  return CATEGORIES_CONFIG[name] || CATEGORIES_CONFIG['Lainnya']
}

/**
 * Get all category names
 */
export function getAllCategories(): CategoryName[] {
  return CATEGORY_NAMES
}
