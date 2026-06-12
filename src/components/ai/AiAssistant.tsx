import { useState } from 'react'
import { Sparkles, X, Loader2, AlertTriangle, KeyRound } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTransactions } from '../../hooks/useTransactions'
import { getAiInsight } from '../../utils/gemini'

export function AiAssistant(): JSX.Element {
  const { geminiApiKey, setActiveTab } = useApp()
  const { transactions, ...summary } = useTransactions()

  const [isOpen, setIsOpen]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [insight, setInsight]   = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)

  const handleGenerate = async () => {
    // Cek API key
    if (!geminiApiKey || geminiApiKey.trim() === '') {
      setError('Belum ada API Key. Tambahkan dulu di halaman Akun 🔑')
      return
    }

    setLoading(true)
    setError(null)
    setInsight(null)

    try {
      const result = await getAiInsight(geminiApiKey, summary)
      setInsight(result)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="AI Asisten"
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br 
                   from-fuchsia-500 to-blue-500 text-white rounded-full
                   flex items-center justify-center shadow-2xl 
                   shadow-fuchsia-500/30 hover:scale-110 
                   active:scale-95 transition-all z-40
                   animate-pulse"
      >
        <Sparkles className="w-7 h-7" />
      </button>

      {/* ── Panel Overlay ── */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                        flex flex-col justify-end">
          <div className="bg-slate-950 border-t border-slate-800 
                          rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto
                          animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 
                                to-blue-500 rounded-full flex items-center 
                                justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    Vibe AI
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold">
                    Asisten Keuanganmu
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-slate-900 hover:bg-slate-800
                           rounded-full flex items-center justify-center
                           text-slate-400 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* API Key Warning */}
            {(!geminiApiKey || geminiApiKey.trim() === '') && (
              <div className="bg-amber-500/10 border border-amber-500/20
                              rounded-2xl p-4 flex items-start gap-3 mb-4">
                <KeyRound className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-300">
                    API Key Belum Ada
                  </h4>
                  <p className="text-[11px] text-amber-400/70 font-medium mt-1">
                    Tambahkan Gemini API Key di halaman{' '}
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setActiveTab('akun')
                      }}
                      className="underline font-bold hover:text-amber-300"
                    >
                      Akun
                    </button>{' '}
                    untuk mengaktifkan AI.
                  </p>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold
                         flex items-center justify-center gap-2
                         transition-all duration-200
                ${loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white hover:opacity-90 active:scale-[0.98] shadow-lg shadow-fuchsia-500/20'}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Lagi mikir...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Minta Insight ✨
                </>
              )}
            </button>

            {/* Error State */}
            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20
                              rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 font-medium">{error}</p>
              </div>
            )}

            {/* Result */}
            {insight && (
              <div className="mt-5 bg-slate-900 border border-slate-800
                              rounded-2xl p-5 space-y-1">
                <div className="text-sm text-slate-200 font-medium 
                                leading-relaxed whitespace-pre-wrap">
                  {insight}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
