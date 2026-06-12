import { useState } from 'react'
import { ArrowLeft, Calendar, CreditCard, Camera, ChevronRight } from 'lucide-react'
import { useApp }          from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { autoDetectCategory } from '../utils/categorizer'
import { CATEGORIES_CONFIG } from '../constants/categories'
import { QUICK_AMOUNTS, PAYMENT_OPTIONS } from '../constants/mockData'
import type { TransactionType, CategoryName } from '../types'

export function TambahPage(): JSX.Element {
  const { setIsAdding, setActiveTab, showToast } = useApp()
  const { addTransaction } = useTransactions()

  const [type,    setType]    = useState<TransactionType>('pengeluaran')
  const [amount,  setAmount]  = useState<number>(0)
  const [cat,     setCat]     = useState<CategoryName>('Makan & Minum')
  
  // Default tanggal hari ini (YYYY-MM-DD)
  const [date, setDate]       = useState<string>(new Date().toISOString().split('T')[0])
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

    const detected = autoDetectCategory(note)
    const finalCat = type === 'pemasukan' ? 'Pemasukan' : (detected !== 'Lainnya' ? detected : cat)
    
    // Format tanggal jadi "Hari ini, 14:30" atau "12 Jun 2025"
    const dateObj = new Date(date)
    const today = new Date()
    let formattedDate: string
    if (dateObj.toDateString() === today.toDateString()) {
      formattedDate = `Hari ini, ${dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      formattedDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ')
    }

    addTransaction({
      id: Date.now().toString(),
      title: note.trim() || (type === 'pemasukan' ? 'Pemasukan' : cat),
      category: finalCat,
      amount: Number(amount),
      type,
      date: formattedDate,
      brandColor: type === 'pemasukan' ? '#22C55E' : (CATEGORIES_CONFIG[cat]?.fill ?? '#64748B'),
      brandInitial: note.length > 0 ? note[0].toUpperCase() : cat[0],
    })

    showToast('Catatan berhasil disimpan!')
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
    <div className="animate-slide-up space-y-5 pt-6 pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mt-2">
        <button onClick={goBack} className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </button>
        <div className="text-center">
          <h2 className="text-base font-extrabold text-white">Tambah Pencatatan</h2>
          <p className="text-[10px] text-slate-500 font-bold">Isi data dengan benar</p>
        </div>
        <div className="w-10 h-10"></div>
      </div>

      {/* Type Toggle */}
      <div className="flex bg-slate-900 p-1 rounded-2xl gap-1 border border-slate-800">
        {(['pengeluaran', 'pemasukan'] as TransactionType[]).map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${type === t ? 'bg-slate-800 text-fuchsia-400' : 'text-slate-500'}`}
          >
            {t === 'pengeluaran' ? '↓ Pengeluaran' : '↑ Pemasukan'}
          </button>
        ))}
      </div>

      {/* Amount */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg space-y-4">
        <span className="text-xs font-extrabold text-white">Jumlah</span>
        <div className="text-3xl font-extrabold text-fuchsia-400 flex items-center">
          <span className="mr-1.5">Rp</span>
          <input
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={e => setAmount(Number(e.target.value))}
            placeholder="0"
            className="w-full bg-transparent focus:outline-none placeholder-slate-700 text-3xl font-extrabold p-0"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map(val => (
            <button key={val} onClick={() => setAmount(prev => prev + val)} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700">
              +{val.toLocaleString('id-ID')}
            </button>
          ))}
        </div>
      </div>

      {/* Category (Hanya jika Pengeluaran) */}
      {type === 'pengeluaran' && (
        <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg space-y-4 animate-fade-in">
          <span className="text-xs font-extrabold text-white block mb-3">Kategori</span>
          <div className="grid grid-cols-6 gap-2">
            {(Object.entries(CATEGORIES_CONFIG) as [CategoryName, typeof CATEGORIES_CONFIG[CategoryName]][]).map(([name, cfg]) => {
              const sel = cat === name
              return (
                <button key={name} onClick={() => setCat(name)} className="flex flex-col items-center gap-1.5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${sel ? 'bg-fuchsia-500 border-fuchsia-500 text-white' : 'bg-slate-800 border-transparent text-slate-400'}`}>
                    <cfg.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] font-bold truncate w-full text-center ${sel ? 'text-fuchsia-400' : 'text-slate-500'}`}>
                    {name.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Details: Tanggal & Pembayaran */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg space-y-4">
        
        {/* Tanggal Otomatis (Date Picker) */}
        <div className="space-y-2">
          <label htmlFor="tx-date" className="text-xs font-extrabold text-white">Tanggal</label>
          <div className="flex items-center justify-between bg-slate-950 rounded-2xl p-3 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              <input
                id="tx-date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-transparent focus:outline-none font-bold text-slate-300 text-xs"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>
        </div>

        {/* Metode Pembayaran (Hanya jika Pengeluaran) */}
        {type === 'pengeluaran' && (
          <div className="space-y-2 animate-fade-in">
            <label htmlFor="tx-payment" className="text-xs font-extrabold text-white">Metode Pembayaran</label>
            <div className="relative">
              <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 rounded-2xl p-3">
                <CreditCard className="w-4 h-4 text-slate-500" />
                <select
                  id="tx-payment"
                  value={payment}
                  onChange={e => setPayment(e.target.value)}
                  className="w-full bg-transparent text-slate-300 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  {PAYMENT_OPTIONS.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
                </select>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 absolute right-3 top-3.5 rotate-90 pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
      >
        Simpan Transaksi
      </button>
    </div>
  )
}
