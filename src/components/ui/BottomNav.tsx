import { Home, FileText, Plus, BarChart2, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { NavItem } from '../../types'

const NAV_ITEMS: NavItem[] = [
  { key: 'beranda',   label: 'Beranda',   Icon: Home },
  { key: 'transaksi', label: 'Transaksi', Icon: FileText },
  { key: 'tambah',    label: null,        Icon: Plus, isFAB: true },
  { key: 'analisis',  label: 'Analisis',  Icon: BarChart2 },
  { key: 'akun',      label: 'Akun',      Icon: User },
]

export function BottomNav(): JSX.Element {
  const { activeTab, goTo, isAdding, setIsAdding } = useApp()

  const handlePress = (key: NavItem['key']): void => {
    if (key === 'tambah') {
      setIsAdding(true)
      return
    }
    goTo(key)
  }

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 
                    w-full max-w-md z-50
                    bg-slate-950/95 backdrop-blur-xl border-t
                    border-slate-800/80 py-3.5 px-6
                    flex justify-between items-center">
      {NAV_ITEMS.map(({ key, label, Icon, isFAB }) => {
        const isActive = !isAdding && activeTab === key

        if (isFAB) {
          return (
            <div key={key} className="relative -mt-10">
              <button
                onClick={() => handlePress(key)}
                aria-label="Tambah pencatatan"
                className="w-14 h-14 bg-gradient-to-br from-fuchsia-500
                           to-blue-500 hover:opacity-90 text-white
                           rounded-full flex items-center justify-center
                           shadow-lg shadow-fuchsia-500/30
                           hover:scale-105 active:scale-95 transition-all
                           border-4 border-slate-950"
              >
                <Icon className="w-7 h-7" />
              </button>
            </div>
          )
        }

        return (
          <button
            key={key}
            onClick={() => handlePress(key)}
            className="flex flex-col items-center gap-1 focus:outline-none w-16"
          >
            <div className={`p-1.5 rounded-full transition-all duration-300
              ${isActive
                ? 'bg-fuchsia-500/10 text-fuchsia-400 scale-105'
                : 'text-slate-600 hover:text-slate-400'}`}>
              <Icon className="w-5 h-5" />
            </div>
            {label !== null && (
              <span className={`text-[10px] font-bold tracking-tight transition-colors
                ${isActive ? 'text-fuchsia-400' : 'text-slate-600'}`}>
                {label}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
