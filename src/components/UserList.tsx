import type { User } from './UserForm'

interface Props {
    users: User[]
    onDelete: (id: number) => void
}

export default function UserList({ users, onDelete }: Props) {
    return (
        <div className="module-card">
            <div className="module-header">
                <span className="module-icon">📋</span>
                <h2>Profiles</h2>
                <span className="badge">{users.length}</span>
            </div>

            {users.length === 0 ? (
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
                                onClick={() => onDelete(user.id)}
                                aria-label={`Delete ${user.name}`}
                            >
                                🗑
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
