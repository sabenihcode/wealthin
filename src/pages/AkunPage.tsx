import {
  ChevronRight,
  CreditCard,
  Tag,
  Calendar,
  Download,
  Upload,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { BalanceCard } from '../components/cards/BalanceCard'
import { exportToExcel, importFromExcel } from '../utils/dataManager'
import type { MenuItem, ModalType } from '../types'

const ACCOUNT_MENU: MenuItem[] = [
  {
    key: 'metode',
    label: 'Metode Pembayaran',
    sub: 'Kelola rekening, e-wallet, dan cash',
    Icon: CreditCard,
    bg: 'bg-sage-500/10 text-sage-400',
  },
  {
    key: 'kategori',
    label: 'Kategori',
    sub: 'Kelola kategori pemasukan & pengeluaran',
    Icon: Tag,
    bg: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    key: 'anggaran',
    label: 'Anggaran Bulanan',
    sub: 'Atur budget tiap kategori',
    Icon: Calendar,
    bg: 'bg-amber-500/10 text-amber-400',
  },
]

export function AkunPage(): JSX.Element {
  const {
    openModal,
    showToast,
    geminiApiKey,
    setGeminiApiKey,
    userName,
    setUserName,
  } = useApp()
  const { addTransaction, transactions } = useTransactions()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showKey, setShowKey] = useState(false)

  const handleEditName = () => {
    const newName = window.prompt('Masukkan nama kamu:', userName)
    if (newName !== null && newName.trim() !== '') {
      setUserName(newName.trim())
      showToast('Nama berhasil diperbarui!', 'success')
    }
  }

  const handleExport = () => {
    if (transactions.length === 0) {
      return showToast('Belum ada transaksi untuk diekspor.', 'warning')
    }
    try {
      exportToExcel(transactions)
      showToast('Data berhasil diekspor!', 'success')
    } catch {
      showToast('Gagal mengekspor data.', 'error')
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const imported = await importFromExcel(file)
      imported.forEach((tx) => addTransaction(tx))
      showToast(`${imported.length} transaksi berhasil diimpor!`, 'success')
    } catch {
      showToast('Format file tidak sesuai.', 'error')
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="animate-fade-in space-y-6 pt-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Akun
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Kelola data dan pengaturan
        </p>
      </div>

      {/* Profile */}
      <div
        onClick={handleEditName}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-5 
                   flex items-center gap-4 cursor-pointer 
                   hover:bg-slate-800/50 transition-colors"
      >
        <div
          className="w-16 h-16 bg-sage-500/10 rounded-full border-2 
                      border-slate-800 flex items-center justify-center 
                      text-3xl font-bold text-sage-400"
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-base font-extrabold text-white">{userName}</h3>
          <p className="text-xs text-slate-500 font-bold">
            Klik untuk mengubah nama
          </p>
          <span
            className="inline-block bg-sage-500/10 border border-sage-500/20 
                       text-sage-400 text-[9px] font-extrabold px-3 py-1 
                       rounded-full uppercase tracking-wider"
          >
            PREMIUM
          </span>
        </div>
      </div>

      {/* Saldo */}
      <BalanceCard />

      {/* Menu Akun */}
      <div className="space-y-3">
        <h3
          className="text-xs font-extrabold text-slate-500 
                     uppercase tracking-widest pl-1"
        >
          Manajemen Keuangan
        </h3>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl 
                        divide-y divide-slate-800/50">
          {ACCOUNT_MENU.map(({ key, label, sub, Icon, bg }) => (
            <button
              key={label}
              onClick={() => openModal(key as ModalType)}
              className="w-full px-4 py-3.5 flex items-center justify-between 
                         text-left hover:bg-slate-800/50 transition-colors 
                         first:rounded-t-3xl last:rounded-b-3xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
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
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          ))}
        </div>
      </div>

      {/* Data & AI */}
      <div className="space-y-3">
        <h3
          className="text-xs font-extrabold text-slate-500 
                     uppercase tracking-widest pl-1"
        >
          Data & AI
        </h3>
        <div
          className="bg-slate-900 border border-slate-800 rounded-3xl 
                      divide-y divide-slate-800/50"
        >
          {/* Export */}
          <button
            onClick={handleExport}
            className="w-full px-4 py-3.5 flex items-center justify-between 
                       text-left hover:bg-slate-800/50 transition-colors 
                       first:rounded-t-3xl"
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
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Import */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3.5 flex items-center justify-between 
                       text-left hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-sage-500/10 text-sage-400 
                              rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  Impor dari Excel
                </h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                  Tambah data dari file
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            className="hidden"
          />

          {/* API Key */}
          <div className="p-4 last:rounded-b-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-sage-500/10 text-sage-400 
                              rounded-xl flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  Gemini API Key
                </h4>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                  Aktifkan AI Asisten
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Masukkan API key"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl 
                           py-3 px-4 pr-12 text-xs font-mono text-white 
                           placeholder-slate-700 focus:outline-none 
                           focus:border-sage-500/50 focus:ring-2 
                           focus:ring-sage-500/20 transition-all"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-slate-600 hover:text-slate-400 transition-colors"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
