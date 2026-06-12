import { useState } from 'react'
import {
  ArrowLeft, Clock, Calendar,
  CreditCard, Camera, ChevronRight,
} from 'lucide-react'
import { useApp }           from '../context/AppContext'
import { useTransactions }  from '../hooks/useTransactions'
import { formatTimeNow }    from '../utils/formatters'
import { autoDetectCategory } from '../utils/categorizer'
import { CATEGORIES_CONFIG } from '../constants/categories'
import {
  QUICK_AMOUNTS,
  PAYMENT_OPTIONS,
} from '../constants/mockData'
import type { TransactionType, CategoryName } from '../types'

export function TambahPage(): JSX.Element {
  const { setIsAdding, setActiveTab, showToast } = useApp()
  const { addTransaction } = useTransactions()

  const [type,    setType]    = useState<TransactionType>('pengeluaran')
  const [amount,  setAmount]  = useState<number>(0)
  const [cat,     setCat]     = useState<CategoryName>('Makan & Minum')
  const [date,    setDate]    = useState<string>('31 Mei 2025')
  const [payment, setPayment] = useState<string>('Cash')
  const [note,    setNote]    = useState<string>('')
  const [receipt, setReceipt] = useState<string | null>(null)

  const goBack = (): void => {
    setIsAdding(false)
    setActiveTab('beranda')
  }

  const handleSave = (): void => {
    if (amount <= 0) {
      showToast('Masukkan nominal terlebih dahulu!')
      return
    }

    const detected  = autoDetectCategory(note)
    const finalCat  = type === 'pemasukan'
      ? 'Pemasukan'
      : detected !== 'Lainnya' ? detected : cat

    addTransaction({
      id:           Date.now().toString(),
      title:        note.trim() || cat,
      category:     finalCat,
      amount:       Number(amount),
      type,
      date:         `Hari ini, ${formatTimeNow()}`,
      brandColor:   type === 'pemasukan'
                      ? '#22C55E'
                      : (CATEGORIES_CONFIG[cat]?.fill ?? '#64748B'),
      brandInitial: note.length > 0
                      ? note[0].toUpperCase()
                      : cat[0],
    })

    showToast('Catatan berhasil disimpan! 💾')
    goBack()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setReceipt(file.name)
      showToast('Bukti struk dilampirkan!')
    }
  }

  return (
    <div className="animate-slide-up space-y-5 pt-6">

      {/* Header */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={goBack}
          aria-label="Kembali"
          className="w-10 h-10 bg-slate-900 hover:bg-slate-800
                     border border-slate-800 rounded-full
                     flex items-center justify-center
                     transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div className="text-center">
          <h2 className="text-base font-extrabold text-white">
            Tambah Pencatatan
          </h2>
          <p className="text-[10px] text-slate-500 font-bold">
            Catat pemasukan atau pengeluaran
          </p>
        </div>
        <button
          aria-label="Riwayat"
          className="w-10 h-10 border border-slate-800 hover:bg-slate-900
                     rounded-full flex items-center justify-center
                     text-blue-400 transition-colors"
        >
          <Clock className="w-5 h-5" />
        </button>
      </div>

      {/* Type toggle */}
      <div className="flex bg-slate-900 p-1 rounded-2xl gap-1 border border-slate-800">
        {(['pengeluaran', 'pemasukan'] as TransactionType[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 py-3 rounded-xl text-xs font-bold
                        transition-all flex items-center
                        justify-center gap-1.5
              ${type === t
                ? 'bg-slate-800 text-fuchsia-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            {t === 'pengeluaran' ? '↓ Pengeluaran' : '↑ Pemasukan'}
          </button>
        ))}
      </div>

      {/* Amount input */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                      shadow-lg shadow-black/10 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-extrabold text-white">
            Jumlah
          </span>
          {amount > 0 && (
            <button
              onClick={() => setAmount(0)}
              className="text-xs text-slate-500 hover:text-slate-300
                         font-extrabold transition-colors"
            >
              Hapus
            </button>
          )}
        </div>

        <div className="text-3xl font-extrabold text-fuchsia-400
                        flex items-center">
          <span className="mr-1.5">Rp</span>
          <input
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="0"
            aria-label="Jumlah nominal"
            title="Jumlah nominal"
            className="w-full bg-transparent focus:outline-none
                       placeholder-fuchsia-500/30 text-3xl font-extrabold
                       text-fuchsia-400 p-0"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map(val => (
            <button
              key={val}
              type="button"
              onClick={() => setAmount(prev => prev + val)}
              className="py-2.5 bg-fuchsia-500/10 hover:bg-fuchsia-500/20
                         text-fuchsia-400 text-xs font-bold rounded-xl
                         border border-fuchsia-500/20 transition-colors"
            >
              +{val.toLocaleString('id-ID')}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const ans = window.prompt('Masukkan jumlah kustom:')
              if (ans !== null && !isNaN(Number(ans))) {
                setAmount(Number(ans))
              }
            }}
            className="py-2.5 bg-slate-800 hover:bg-slate-700
                       text-slate-400 text-xs font-bold rounded-xl
                       border border-slate-700 transition-colors"
          >
            Lainnya
          </button>
        </div>
      </div>

      {/* Category (pengeluaran only) */}
      {type === 'pengeluaran' && (
        <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                        shadow-lg shadow-black/10 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-white">
              Kategori
            </span>
            <div className="flex items-center gap-1 bg-fuchsia-500/10 px-3
                            py-1.5 rounded-xl border border-fuchsia-500/20
                            text-[11px] font-extrabold text-fuchsia-400">
              {cat}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {(Object.entries(CATEGORIES_CONFIG) as [
              CategoryName,
              typeof CATEGORIES_CONFIG[CategoryName]
            ][]).map(([name, cfg]) => {
              const Icon = cfg.icon
              const sel  = cat === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCat(name)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className={`w-11 h-11 rounded-full flex
                                  items-center justify-center
                                  border-2 transition-all
                    ${sel
                      ? 'bg-fuchsia-500 border-fuchsia-500 text-white'
                      : 'bg-slate-800 border-transparent text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] font-bold truncate
                                   w-full text-center
                    ${sel ? 'text-fuchsia-400' : 'text-slate-500'}`}>
                    {name.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Date & payment */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                      shadow-lg shadow-black/10 space-y-4">
        {/* Date */}
        <div className="space-y-2">
          <label htmlFor="tx-date" className="text-xs font-extrabold text-white">
            Tanggal
          </label>
          <div className="flex items-center justify-between
                          bg-slate-950 rounded-2xl p-3
                          border border-slate-800">
            <div className="flex items-center gap-2.5 text-xs
                            text-slate-300 font-bold">
              <Calendar className="w-4 h-4 text-slate-500" />
              <input
                id="tx-date"
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Pilih tanggal"
                title="Tanggal transaksi"
                className="bg-transparent focus:outline-none font-bold"
              />
            </div>
            <button
              type="button"
              onClick={() => setDate('31 Mei 2025')}
              className="bg-fuchsia-500/10 text-fuchsia-400 text-[10px]
                         font-extrabold px-3 py-1 rounded-full
                         hover:bg-fuchsia-500/20 transition-colors"
            >
              Hari ini
            </button>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-2">
          <label htmlFor="tx-payment" className="text-xs font-extrabold text-white">
            Metode Pembayaran
          </label>
          <div className="relative">
            <div className="flex items-center gap-2.5 bg-slate-950
                            border border-slate-800 rounded-2xl p-3">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <select
                id="tx-payment"
                value={payment}
                onChange={e => setPayment(e.target.value)}
                aria-label="Metode pembayaran"
                title="Metode pembayaran"
                className="w-full bg-transparent text-xs
                           text-slate-300 font-extrabold
                           focus:outline-none appearance-none
                           cursor-pointer"
              >
                {PAYMENT_OPTIONS.map(o => (
                  <option key={o} value={o} className="bg-slate-900">{o}</option>
                ))}
              </select>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 absolute
                                     right-3 top-3.5 rotate-90" />
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                      shadow-lg shadow-black/10 space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="tx-note" className="text-xs font-extrabold text-white">
            Catatan{' '}
            <span className="text-slate-500 font-medium">(Opsional)</span>
          </label>
          <span className="text-[10px] text-slate-500 font-bold">
            {note.length}/100
          </span>
        </div>
        <textarea
          id="tx-note"
          value={note}
          onChange={e => setNote(e.target.value.slice(0, 100))}
          placeholder="Tulis catatan..."
          rows={3}
          aria-label="Catatan"
          title="Catatan transaksi"
          className="w-full bg-slate-950 border border-slate-800
                     rounded-2xl p-3 text-xs font-semibold
                     text-slate-300 placeholder-slate-600
                     focus:outline-none focus:border-fuchsia-500/50
                     resize-none transition-colors"
        />
      </div>

      {/* Receipt upload */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                      shadow-lg shadow-black/10 space-y-2">
        <span className="text-xs font-extrabold text-white block">
          Tambah Bukti{' '}
          <span className="text-slate-500 font-medium">(Opsional)</span>
        </span>
        <label className="border-2 border-dashed border-slate-700
                          hover:border-fuchsia-500/50 rounded-2xl p-5
                          flex flex-col items-center justify-center
                          gap-3 cursor-pointer hover:bg-fuchsia-500/5
                          transition-all">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            aria-label="Upload bukti struk"
            title="Upload bukti struk"
          />
          <div className="w-10 h-10 bg-fuchsia-500/10 text-fuchsia-400
                          rounded-xl flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-xs font-extrabold text-fuchsia-400">
              {receipt ?? 'Tambah foto struk atau bukti'}
            </p>
            <p className="text-[9px] text-slate-500 font-bold mt-1">
              JPG, PNG maks. 5MB
            </p>
          </div>
        </label>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-500
                   hover:opacity-90 text-white font-bold py-4 rounded-2xl
                   shadow-lg shadow-fuchsia-500/20 active:scale-95
                   transition-all text-xs"
      >
        Simpan Pencatatan 🚀
      </button>

    </div>
  )
}