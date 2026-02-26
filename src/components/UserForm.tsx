import { useState } from 'react'

export interface User {
    id: number
    name: string
    hobbies: string
    created_at: string
}

interface Props {
    onSaved: (user: User) => void
}

export default function UserForm({ onSaved }: Props) {
    const [name, setName] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        if (!name.trim() || !hobbies.trim()) {
            setError('Both fields are required.')
            return
        }
        const user: User = {
            id: Date.now(),
            name: name.trim(),
            hobbies: hobbies.trim(),
            created_at: new Date().toISOString(),
        }
        onSaved(user)
        setName('')
        setHobbies('')
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">✏️</span>
                <h2>Add Profile</h2>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ana García"
                    />
                </div>
                <div className="field">
                    <label htmlFor="hobbies">Hobbies</label>
                    <textarea
                        id="hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder="e.g. painting, hiking, coding…"
                        rows={3}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary">
                    Save Profile
                </button>
            </form>
        </div>
    )
}
