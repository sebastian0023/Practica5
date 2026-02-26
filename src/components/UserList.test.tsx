import { render, screen, fireEvent } from '@testing-library/react'
import UserList from './UserList'
import type { User } from './UserForm'

const mockUsers: User[] = [
    { id: 1, name: 'Ana García', hobbies: 'coding, hiking', created_at: '2026-02-25T00:00:00.000Z' },
    { id: 2, name: 'Carlos López', hobbies: 'painting', created_at: '2026-02-24T00:00:00.000Z' },
]

describe('UserList', () => {
    it('shows empty state message when there are no users', () => {
        render(<UserList users={[]} onDelete={jest.fn()} />)
        expect(screen.getByText(/no profiles yet/i)).toBeInTheDocument()
    })

    it('renders the correct number of user items', () => {
        render(<UserList users={mockUsers} onDelete={jest.fn()} />)
        expect(screen.getByText('Ana García')).toBeInTheDocument()
        expect(screen.getByText('Carlos López')).toBeInTheDocument()
    })

    it('shows the correct user count badge', () => {
        render(<UserList users={mockUsers} onDelete={jest.fn()} />)
        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('calls onDelete with the correct id when delete button is clicked', () => {
        const onDelete = jest.fn()
        render(<UserList users={mockUsers} onDelete={onDelete} />)

        fireEvent.click(screen.getByLabelText('Delete Ana García'))

        expect(onDelete).toHaveBeenCalledTimes(1)
        expect(onDelete).toHaveBeenCalledWith(1)
    })
})
