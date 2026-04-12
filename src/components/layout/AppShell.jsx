import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import { DisclaimerBanner } from './Disclaimer'

export default function AppShell({ currentPage, onNavigate, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DisclaimerBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
        <main
          id="main-content"
          className={`flex-1 pb-20 lg:pb-6 ${currentPage === 'chat' ? 'overflow-hidden flex flex-col' : 'overflow-y-auto'}`}
          aria-label="Main content"
        >
          <div className={`max-w-3xl mx-auto px-4 py-6 ${currentPage === 'chat' ? 'flex-1 flex flex-col min-h-0' : ''}`}>
            {children}
          </div>
        </main>
      </div>
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  )
}
