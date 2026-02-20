import { useState } from 'react'

interface Props {
    onSaved: () => void
}

export default function UserForm({ onSaved }: Props) {
    const [name, setName] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        if (!name.trim() || !hobbies.trim()) {
            setError('Both fields are required.')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), hobbies: hobbies.trim() }),
            })
            if (!res.ok) throw new Error('Failed to save.')
            setName('')
            setHobbies('')
            onSaved()
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving…' : 'Save Profile'}
                </button>
            </form>
        </div>
    )
}
