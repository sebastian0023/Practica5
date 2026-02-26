import { render, screen, fireEvent } from '@testing-library/react'
import UserForm from './UserForm'

describe('UserForm', () => {
    it('renders name and hobbies inputs', () => {
        render(<UserForm onSaved={jest.fn()} />)
        expect(screen.getByLabelText('Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Hobbies')).toBeInTheDocument()
    })

    it('shows an error when submitted with empty fields', () => {
        render(<UserForm onSaved={jest.fn()} />)
        fireEvent.click(screen.getByRole('button', { name: /save profile/i }))
        expect(screen.getByText('Both fields are required.')).toBeInTheDocument()
    })

    it('calls onSaved with a user object when form is filled and submitted', () => {
        const onSaved = jest.fn()
        render(<UserForm onSaved={onSaved} />)

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ana García' } })
        fireEvent.change(screen.getByLabelText('Hobbies'), { target: { value: 'coding, hiking' } })
        fireEvent.click(screen.getByRole('button', { name: /save profile/i }))

        expect(onSaved).toHaveBeenCalledTimes(1)
        expect(onSaved).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Ana García', hobbies: 'coding, hiking' })
        )
    })

    it('clears the form after a successful submission', () => {
        render(<UserForm onSaved={jest.fn()} />)
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement

        fireEvent.change(nameInput, { target: { value: 'Ana García' } })
        fireEvent.change(screen.getByLabelText('Hobbies'), { target: { value: 'coding' } })
        fireEvent.click(screen.getByRole('button', { name: /save profile/i }))

        expect(nameInput.value).toBe('')
    })
})
