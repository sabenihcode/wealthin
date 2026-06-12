import { Download, FileText } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatIDR } from '../../utils/formatters'
import { CATEGORIES_CONFIG } from '../../constants/categories'
import { BottomSheet } from '../ui/BottomSheet'

// ── Metode Pembayaran ──────────────────────────────────────────────────
const WALLETS = [
  'Cash (Utama)',
  'Debit Card BCA',
  'E-Wallet GoPay',
  'Credit Card',
] as const

function MetodeContent(): JSX.Element {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 font-medium">
        Atur dompet &amp; rekening bank aktif Anda:
      </p>
      {WALLETS.map(w => (
        <div key={w}
             className="flex justify-between items-center p-3
                        bg-slate-50 rounded-2xl border
                        border-slate-100">
          <span className="text-xs font-bold text-slate-700">{w}</span>
          <span className="text-[10px] text-blue-600 bg-blue-50
                           px-2 py-1 rounded-full font-bold">
            Aktif
          </span>
        </div>
      ))}
      <button className="w-full py-3 text-xs font-bold text-center
                         bg-blue-50 text-blue-600 rounded-xl
                         hover:bg-blue-100">
        + Tambah Rekening/Dompet Baru
      </button>
    </div>
  )
}

// ── Kategori ───────────────────────────────────────────────────────────
function KategoriContent(): JSX.Element {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 font-medium">
        Daftar kategori transaksi:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {(Object.entries(CATEGORIES_CONFIG) as [
          string, typeof CATEGORIES_CONFIG[keyof typeof CATEGORIES_CONFIG]
        ][]).map(([name, cfg]) => (
          <div key={name}
               className="p-3 bg-slate-50 rounded-xl
                          border border-slate-100
                          flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cfg.fill }}
            />
            <span className="text-xs font-bold text-slate-700 truncate">
              {name}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 text-xs font-bold text-center
                         bg-blue-600 text-white rounded-xl
                         hover:bg-blue-700">
        + Tambah Kategori Baru
      </button>
    </div>
  )
}

// ── Laporan ────────────────────────────────────────────────────────────
const REPORT_FORMATS = [
  'PDF Report (Bulanan)',
  'Excel Spreadsheet (.xlsx)',
  'CSV Transaksi Kas',
] as const

function LaporanContent(): JSX.Element {
  const { closeModal, showToast } = useApp()
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 font-medium">
        Unduh laporan ke perangkat Anda:
      </p>
      {REPORT_FORMATS.map(fmt => (
        <button
          key={fmt}
          onClick={() => {
            showToast(`Berhasil mengunduh ${fmt}! 📥`)
            closeModal()
          }}
          className="w-full p-3 bg-slate-50 hover:bg-blue-50
                     rounded-2xl border border-slate-100
                     flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">
              {fmt}
            </span>
          </div>
          <Download className="w-4 h-4 text-slate-400
                               group-hover:text-blue-600" />
        </button>
      ))}
    </div>
  )
}

// ── Anggaran ───────────────────────────────────────────────────────────
function AnggaranContent(): JSX.Element {
  const { budget, setBudget, closeModal, showToast } = useApp()
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 font-medium">
        Sesuaikan batas pengeluaran bulanan:
      </p>
      <div className="bg-slate-50 p-4 rounded-2xl
                      border border-slate-100 space-y-2">
        <span className="text-[10px] text-slate-400
                         font-bold uppercase">
          Budget Maksimal
        </span>
        <div className="text-2xl font-extrabold text-blue-600">
          {formatIDR(budget)}
        </div>
      </div>
      <input
        type="range"
        min={1_000_000}
        max={20_000_000}
        step={500_000}
        value={budget}
        onChange={e => setBudget(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-lg
                   appearance-none cursor-pointer accent-blue-600"
        aria-label="Budget slider"
      />
      <button
        onClick={() => {
          showToast('Anggaran baru berhasil disimpan! 🎯')
          closeModal()
        }}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700
                   text-white font-bold rounded-xl text-xs"
      >
        Terapkan Anggaran Baru
      </button>
    </div>
  )
}

// ── Keluar ─────────────────────────────────────────────────────────────
function KeluarContent(): JSX.Element {
  const { closeModal, showToast } = useApp()
  return (
    <div className="space-y-4 text-center py-2">
      <p className="text-xs text-slate-500 font-medium">
        Yakin ingin keluar dari akun Sabenih?
      </p>
      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200
                     text-slate-700 font-bold rounded-xl text-xs"
        >
          Batal
        </button>
        <button
          onClick={() => {
            showToast('Berhasil keluar dari akun 👋')
            closeModal()
          }}
          className="flex-1 py-3 bg-red-600 hover:bg-red-700
                     text-white font-bold rounded-xl text-xs"
        >
          Keluar Akun
        </button>
      </div>
    </div>
  )
}

// ── Notifikasi ─────────────────────────────────────────────────────────
const NOTIF_ITEMS = [
  'Pengingat Catat Malam (20:00)',
  'Pemberitahuan Budget Menipis',
] as const

function NotifikasiContent(): JSX.Element {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 font-medium">
        Pengingat &amp; Alarm Harian:
      </p>
      {NOTIF_ITEMS.map(label => (
        <div key={label}
             className="flex justify-between items-center
                        p-3 bg-slate-50 rounded-xl">
          <span className="text-xs font-bold text-slate-700">
            {label}
          </span>
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 accent-blue-600"
            aria-label={label}
          />
        </div>
      ))}
    </div>
  )
}

// ── Mapping modal key → content ────────────────────────────────────────
import type { ModalType } from '../../types'

const MODAL_CONTENT: Record<ModalType, JSX.Element> = {
  metode:     <MetodeContent />,
  kategori:   <KategoriContent />,
  laporan:    <LaporanContent />,
  anggaran:   <AnggaranContent />,
  keluar:     <KeluarContent />,
  notifikasi: <NotifikasiContent />,
}

export function AllModals(): JSX.Element | null {
  const { activeModal } = useApp()
  if (activeModal === null) return null

  return (
    <BottomSheet>
      {MODAL_CONTENT[activeModal]}
    </BottomSheet>
  )
}