import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { ModalType } from '../../types'

const TITLES: Record<ModalType, string> = {
  metode:     'Metode Pembayaran',
  kategori:   'Kelola Kategori',
  laporan:    'Laporan Keuangan',
  anggaran:   'Anggaran Bulanan',
  keluar:     'Konfirmasi Keluar',
  notifikasi: 'Notifikasi',
}

interface BottomSheetProps {
  children: ReactNode
}

export function BottomSheet({ children }: BottomSheetProps): JSX.Element | null {
  const { activeModal, closeModal } = useApp()
  if (activeModal === null) return null

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50
                    flex flex-col justify-end animate-fade-in">
      <div className="bg-slate-950 border-t border-slate-800
                      rounded-t-[32px] p-6 space-y-5
                      animate-slide-up max-h-[85%] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center
                        pb-2 border-b border-slate-800">
          <h3 className="font-extrabold text-white text-base">
            {TITLES[activeModal]}
          </h3>
          <button
            onClick={closeModal}
            aria-label="Tutup"
            className="w-8 h-8 bg-slate-900 hover:bg-slate-800
                       rounded-full flex items-center justify-center
                       text-slate-400 hover:text-sage-400
                       transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
