import { AppProvider, useApp } from './context/AppContext'
import { Toast }        from './components/ui/Toast'
import { BottomNav }    from './components/ui/BottomNav'
import { AllModals }    from './components/modals/AllModals'
import { BerandaPage }  from './pages/BerandaPage'
import { TransaksiPage } from './pages/TransaksiPage'
import { TambahPage }   from './pages/TambahPage'
import { AnalisisPage } from './pages/AnalisisPage'
import { AkunPage }     from './pages/AkunPage'

const GLOBAL_CSS = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98) translateY(4px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);   }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0);    }
  }
  .animate-fade-in  {
    animation: fadeIn  0.35s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .animate-slide-up {
    animation: slideUp 0.40s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .scrollbar-none::-webkit-scrollbar { display: none; }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
` as const

// ── Router ─────────────────────────────────────────────────────────────
function Router(): JSX.Element {
  const { activeTab, isAdding } = useApp()

  if (isAdding || activeTab === 'tambah') return <TambahPage />

  return (
    <>
      {activeTab === 'beranda'  && <BerandaPage />}
      {activeTab === 'transaksi'  && <TransaksiPage />}
      {activeTab === 'analisis' && <AnalisisPage />}
      {activeTab === 'akun'     && <AkunPage />}
    </>
  )
}

// ── Root ───────────────────────────────────────────────────────────────
export default function App(): JSX.Element {
  return (
    <AppProvider>
      <style>{GLOBAL_CSS}</style>

      <div className="min-h-screen bg-slate-900 md:py-8
                      flex justify-center items-center
                      font-sans selection:bg-blue-100">
        <div className="w-full max-w-md bg-slate-950 text-white min-h-screen
                        md:min-h-[880px] md:max-h-[920px]
                        md:rounded-[48px] md:shadow-2xl relative
                        flex flex-col overflow-hidden
                        border border-slate-200/40">
          {/* Fixed top */}
          <Toast />
          <AllModals />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-24 px-5
                          scrollbar-none">
            <Router />
          </div>

          {/* Fixed bottom */}
          <BottomNav />
        </div>
      </div>
    </AppProvider>
  )
}