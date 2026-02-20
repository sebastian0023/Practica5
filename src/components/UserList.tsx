import { useEffect, useState } from 'react'

interface User {
    id: number
    name: string
    hobbies: string
    created_at: string
}

interface Props {
    refreshKey: number
}

export default function UserList({ refreshKey }: Props) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    useEffect(() => {
        setLoading(true)
        fetch('/api/users')
            .then((res) => res.json() as Promise<User[]>)
            .then((data) => setUsers(data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [refreshKey])

    async function handleDelete(id: number) {
        setDeletingId(id)
        try {
            await fetch(`/api/users/${id}`, { method: 'DELETE' })
            setUsers((prev) => prev.filter((u) => u.id !== id))
        } catch {
            console.error('Failed to delete user')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📋</span>
                <h2>Profiles</h2>
                <span className="badge">{users.length}</span>
            </div>

            {loading ? (
                <p className="list-empty">Loading…</p>
            ) : users.length === 0 ? (
                <p className="list-empty">No profiles yet. Add one above!</p>
            ) : (
                <ul className="user-list">
                    {users.map((user) => (
                        <li key={user.id} className="user-item">
                            <div className="user-info">
                                <p className="user-name">{user.name}</p>
                                <p className="user-hobbies">🎯 {user.hobbies}</p>
                                <p className="user-date">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button
                                className="btn-delete"
                                onClick={() => handleDelete(user.id)}
                                disabled={deletingId === user.id}
                                aria-label={`Delete ${user.name}`}
                            >
                                {deletingId === user.id ? '…' : '🗑'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
