import { useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>
          <span className="gradient-text">Profile</span> Hub
        </h1>
        <p className="app-subtitle">Capture and explore user profiles</p>
      </header>

      <main className="app-grid">
        <UserForm onSaved={() => setRefreshKey((k) => k + 1)} />
        <UserList refreshKey={refreshKey} />
      </main>
    </div>
  )
}

export default App
