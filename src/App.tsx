import { useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import type { User } from './utils/userUtils'
import { deleteUser } from './utils/userUtils'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])

  function handleSaved(user: User) {
    setUsers((prev) => [user, ...prev])
  }

  function handleDelete(id: number) {
    setUsers((prev) => deleteUser(prev, id))
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>
          <span className="gradient-text">Profile</span> Hub
        </h1>
        <p className="app-subtitle">Capture and explore user profiles</p>
      </header>

      <main className="app-grid">
        <UserForm onSaved={handleSaved} />
        <UserList users={users} onDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App
