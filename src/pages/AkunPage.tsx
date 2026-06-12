import { useRef, useState } from 'react'
import {
  Bell, Settings, ChevronRight, CreditCard, Tag,
  BarChart2, Calendar, Shield, Globe,
  HelpCircle, LogOut, Sparkles,
  Download, Upload, KeyRound, Eye, EyeOff,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { BalanceCard } from '../components/cards/BalanceCard'
import { exportToExcel, importFromExcel } from '../utils/dataManager'
import type { MenuItem, ModalType } from '../types'

// ── Data Menu: Akun Saya ────────────────────────────────────────────
const ACCOUNT_MENU: MenuItem[] = [
  {
    key:   'metode',
    label: 'Metode Pembayaran',
    sub:   'Kelola rekening, e-wallet, dan cash',
    Icon:  CreditCard,
    bg:    'bg-blue-500/10 text-blue-400',
  },
  {
    key:   'kategori',
    label: 'Kategori',
    sub:   'Kelola kategori pemasukan & pengeluaran',
    Icon:  Tag,
    bg:    'bg-emerald-500/10 text-emerald-400',
  },
  {
    key:   'laporan',
    label: 'Laporan Saya',
    sub:   'Unduh laporan keuangan',
    Icon:  BarChart2,
    bg:    'bg-purple-500/10 text-purple-400',
  },
  {
    key:   'anggaran',
    label: 'Anggaran Bulanan',
    sub:   'Atur budget tiap kategori',
    Icon:  Calendar,
    bg:    'bg-orange-500/10 text-orange-400',
  },
]

// ── Data Menu: Pengaturan ───────────────────────────────────────────
const SETTING_MENU: MenuItem[] = [
  {
    key:   null,
    label: 'Keamanan',
    sub:   'PIN, biometrik, dan keamanan akun',
    Icon:  Shield,
    bg:    'bg-blue-500/10 text-blue-400',
  },
  {
    key:   'notifikasi',
    label: 'Notifikasi',
    sub:   'Atur pengingat dan notifikasi',
    Icon:  Bell,
    bg:    'bg-blue-500/10 text-blue-400',
  },
  {
    key:   null,
    label: 'Backup & Sinkronisasi',
    sub:   'Cadangan data ke cloud',
    Icon:  Sparkles,
    bg:    'bg-fuchsia-500/10 text-fuchsia-400',
  },
  {
    key:   null,
    label: 'Bantuan & Dukungan',
    sub:   'Pusat bantuan dan kontak kami',
    Icon:  HelpCircle,
    bg:    'bg-blue-500/10 text-blue-400',
  },
]

// ── Reusable Menu List ──────────────────────────────────────────────
interface MenuListProps {
  items: MenuItem[]
}

function MenuList({ items }: MenuListProps): JSX.Element {
  const { openModal, showToast } = useApp()

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2
                    divide-y divide-slate-800/50">
      {items.map(({ key, label, sub, Icon, bg }) => (
        <button
          key={label}
          onClick={() =>
            key !== null
              ? openModal(key as ModalType)
              : showToast(`${label} segera hadir!`)
          }
          className="w-full px-4 py-3.5 flex items-center justify-between
                     text-left hover:bg-slate-800/50 transition-colors
                     group first:rounded-t-3xl last:rounded-b-3xl"
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${bg} rounded-xl flex
                            items-center justify-center`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">
                {label}
              </h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                {sub}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-700
                                   group-hover:text-slate-500
                                   transition-colors" />
        </button>
      ))}
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────
export function AkunPage(): JSX.Element {
  const {
    openModal,
    showToast,
    language,
    setLanguage,
    geminiApiKey,
    setGeminiApiKey,
  } = useApp()

  const { transactions, addTransaction } = useTransactions()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showKey, setShowKey] = useState<boolean>(false)

  // ── Export handler ──
  const handleExport = (): void => {
    if (transactions.length === 0) {
      showToast('Belum ada transaksi untuk diekspor.')
      return
    }
    try {
      exportToExcel(transactions)
      showToast('Data berhasil diekspor ke Excel! 📊')
    } catch {
      showToast('Gagal mengekspor data. Coba lagi.')
    }
  }

  // ── Import handler ──
  const handleImport = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const imported = await importFromExcel(file)
      if (imported.length === 0) {
        showToast('File kosong atau format tidak sesuai.')
        return
      }
      imported.forEach(tx => addTransaction(tx))
      showToast(`${imported.length} transaksi berhasil diimpor! 📥`)
    } catch {
      showToast('Gagal mengimpor. Pastikan format file benar.')
    }

    // Reset input agar bisa import file yang sama lagi
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="animate-fade-in space-y-5 pt-6">

      {/* ════════════════════════════════════════════════════════
          SEKSI 1: HEADER
          ════════════════════════════════════════════════════════ */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Akun
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Kelola akun dan pengaturan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('notifikasi')}
            aria-label="Notifikasi"
            className="relative w-10 h-10 bg-slate-900 border border-slate-800
                       rounded-full flex items-center justify-center
                       hover:scale-105 transition-all"
          >
            <Bell className="w-5 h-5 text-blue-400" />
            <span className="absolute top-3 right-3 w-2 h-2
                             bg-red-500 rounded-full" />
          </button>
          <button
            aria-label="Pengaturan"
            className="w-10 h-10 bg-slate-900 border border-slate-800
                       rounded-full flex items-center justify-center
                       hover:scale-105 transition-all"
          >
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 2: PROFIL
          ════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5
                      flex items-center justify-between
                      hover:bg-slate-800/50 transition-colors
                      cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full
                          border-2 border-slate-800 shadow-md
                          flex items-center justify-center shrink-0">
            <span className="text-3xl">👦</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">
              Sabenih
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              sabenih@email.com
            </p>
            <span className="inline-flex items-center gap-1
                             bg-fuchsia-500/10 border border-fuchsia-500/20
                             text-fuchsia-400 text-[9px] font-extrabold
                             px-3 py-1 rounded-full uppercase tracking-wider">
              👑 Premium
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-700
                                 group-hover:text-slate-500
                                 transition-colors" />
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 3: SALDO
          ════════════════════════════════════════════════════════ */}
      <BalanceCard />

      {/* ════════════════════════════════════════════════════════
          SEKSI 4: AKUN SAYA
          ════════════════════════════════════════════════════════ */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-extrabold text-slate-400
                       uppercase tracking-widest pl-1">
          Akun Saya
        </h3>
        <MenuList items={ACCOUNT_MENU} />
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 5: DATA & CADANGAN
          ════════════════════════════════════════════════════════ */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-extrabold text-slate-400
                       uppercase tracking-widest pl-1">
          Data & Cadangan
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl
                        p-2 divide-y divide-slate-800/50">

          {/* Ekspor */}
          <button
            onClick={handleExport}
            className="w-full px-4 py-3.5 flex items-center justify-between
                       text-left hover:bg-slate-800/50 transition-colors
                       group first:rounded-t-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-500/10 text-emerald-400
                              rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  Ekspor ke Excel
                </h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                  Download semua data (.xlsx)
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-700
                                     group-hover:text-slate-500
                                     transition-colors" />
          </button>

          {/* Impor */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3.5 flex items-center justify-between
                       text-left hover:bg-slate-800/50 transition-colors
                       group last:rounded-b-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-500/10 text-blue-400
                              rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  Impor dari Excel
                </h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                  Tambah data dari file (.xlsx)
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-700
                                     group-hover:text-slate-500
                                     transition-colors" />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleImport}
            className="hidden"
            aria-label="Impor file Excel"
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 6: AI ASISTEN
          ════════════════════════════════════════════════════════ */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-extrabold text-slate-400
                       uppercase tracking-widest pl-1">
          AI Asisten
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl
                        p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-fuchsia-500/20
                            to-blue-500/20 text-fuchsia-400 rounded-xl
                            flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">
                Gemini API Key
              </h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                Dapatkan gratis di aistudio.google.com
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={geminiApiKey}
              onChange={e => setGeminiApiKey(e.target.value)}
              placeholder="AIza..."
              aria-label="Gemini API Key"
              className="w-full bg-slate-950 border border-slate-800
                         rounded-xl py-3 px-4 pr-12 text-xs
                         font-mono text-white placeholder-slate-700
                         focus:outline-none focus:border-fuchsia-500/50
                         transition-colors"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         p-1 text-slate-600 hover:text-slate-400
                         transition-colors"
              aria-label={showKey ? 'Sembunyikan key' : 'Tampilkan key'}
            >
              {showKey
                ? <EyeOff className="w-4 h-4" />
                : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {geminiApiKey && geminiApiKey.trim() !== '' ? (
            <div className="flex items-center gap-1.5 text-emerald-400
                            text-[10px] font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              API Key tersimpan
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-600
                            text-[10px] font-bold">
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
              Belum ada API Key
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 7: PENGATURAN
          ════════════════════════════════════════════════════════ */}
      <div className="space-y-3.5">
        <h3 className="text-xs font-extrabold text-slate-400
                       uppercase tracking-widest pl-1">
          Pengaturan
        </h3>

        <MenuList items={SETTING_MENU} />

        {/* Bahasa (khusus, pakai select) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl
                        px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500/10 text-blue-400
                            rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">
                Bahasa
              </h4>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                {language}
              </p>
            </div>
          </div>
          <select
            value={language}
            onChange={e => {
              setLanguage(e.target.value)
              showToast(`Bahasa diganti ke ${e.target.value}! 🌐`)
            }}
            aria-label="Pilih bahasa"
            className="bg-slate-800 text-xs font-bold text-white p-1.5
                       rounded-lg focus:outline-none border border-slate-700
                       cursor-pointer"
          >
            <option value="Bahasa Indonesia">ID</option>
            <option value="English">EN</option>
          </select>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          SEKSI 8: KELUAR
          ════════════════════════════════════════════════════════ */}
      <button
        type="button"
        onClick={() => openModal('keluar')}
        className="w-full bg-slate-900 hover:bg-red-500/10
                   text-red-400 font-bold py-4 rounded-3xl
                   border border-slate-800 hover:border-red-500/20
                   flex items-center justify-center gap-2
                   transition-all text-xs"
      >
        <LogOut className="w-4 h-4 text-red-400" />
        Keluar dari akun
      </button>

    </div>
  )
}