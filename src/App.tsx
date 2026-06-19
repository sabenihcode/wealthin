import { AppProvider, useApp } from './context/AppContext'
import { Toast }        from './components/ui/Toast'
import { BottomNav }    from './components/ui/BottomNav'
import { AllModals }    from './components/modals/AllModals'
import { BerandaPage }  from './pages/BerandaPage'
import { TransaksiPage } from './pages/TransaksiPage'
import { TambahPage }   from './pages/TambahPage'
import { AnalisisPage } from './pages/AnalisisPage'
import { AkunPage }     from './pages/AkunPage'

// ══════════════════════════════════════════════════════════════════════
// ROUTER COMPONENT
// ══════════════════════════════════════════════════════════════════════
function Router(): JSX.Element {
  const { activeTab, isAdding } = useApp()

  // Priority: Tambah page
  if (isAdding || activeTab === 'tambah') {
    return <TambahPage />
  }

  // Route switching
  switch (activeTab) {
    case 'beranda':
      return <BerandaPage />
    case 'transaksi':
      return <TransaksiPage />
    case 'analisis':
      return <AnalisisPage />
    case 'akun':
      return <AkunPage />
    default:
      return <BerandaPage />
  }
}

// ══════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function App(): JSX.Element {
  return (
    <AppProvider>
      {/* Mobile/Desktop Container */}
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 
                      md:py-8 flex justify-center items-center font-sans">
        
        {/* App Frame */}
        <div className="w-full max-w-md bg-slate-950 text-white min-h-screen
                        md:min-h-[880px] md:max-h-[920px]
                        md:rounded-[48px] md:shadow-2xl 
                        md:shadow-sage-500/5 md:border md:border-slate-800/50
                        relative flex flex-col overflow-hidden">
          
          {/* Decorative gradient overlay (desktop only) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 
                            bg-gradient-to-b from-sage-500/5 to-transparent blur-2xl" />
          </div>

          {/* Fixed overlays */}
          <Toast />
          <AllModals />

          {/* Main scrollable content */}
          <main className="flex-1 overflow-y-auto pb-24 px-5 scrollbar-none
                          relative z-10">
            <Router />
          </main>

          {/* Fixed bottom navigation */}
          <BottomNav />
        </div>
      </div>
    </AppProvider>
  )
}
