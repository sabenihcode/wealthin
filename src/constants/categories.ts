import {
  Utensils, Car, ShoppingBag,
  Gamepad2, Heart, MoreHorizontal,
} from 'lucide-react'
import type { CategoriesConfig, CategoryName } from '../types'

export const CATEGORIES_CONFIG: CategoriesConfig = {
  'Makan & Minum': {
    color:    'bg-blue-100 text-blue-600',
    activeBg: 'bg-blue-600 text-white',
    icon:     Utensils,
    fill:     '#0062FF',
  },
  'Transportasi': {
    color:    'bg-sky-100 text-sky-600',
    activeBg: 'bg-sky-600 text-white',
    icon:     Car,
    fill:     '#38BDF8',
  },
  'Belanja': {
    color:    'bg-purple-100 text-purple-600',
    activeBg: 'bg-purple-600 text-white',
    icon:     ShoppingBag,
    fill:     '#A855F7',
  },
  'Kesehatan': {
    color:    'bg-rose-100 text-rose-600',
    activeBg: 'bg-rose-600 text-white',
    icon:     Heart,
    fill:     '#F43F5E',
  },
  'Hiburan': {
    color:    'bg-amber-100 text-amber-600',
    activeBg: 'bg-amber-500 text-white',
    icon:     Gamepad2,
    fill:     '#F59E0B',
  },
  'Lainnya': {
    color:    'bg-emerald-100 text-emerald-600',
    activeBg: 'bg-emerald-600 text-white',
    icon:     MoreHorizontal,
    fill:     '#10B981',
  },
} as const

export const CATEGORY_NAMES = Object.keys(
  CATEGORIES_CONFIG
) as CategoryName[]