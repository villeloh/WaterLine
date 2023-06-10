import React from 'react'
import { DataProvider } from '@/state/DataProvider'
import AppContent from '@/AppContent'

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

export default App
