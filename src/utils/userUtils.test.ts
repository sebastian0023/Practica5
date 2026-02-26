import { validateUserInput, createUser, deleteUser, resetIdCounter } from '../utils/userUtils'
import type { User } from '../utils/userUtils'

describe('validateUserInput', () => {
    it('returns null when both fields are filled', () => {
        expect(validateUserInput('Ana', 'coding')).toBeNull()
    })

    it('returns an error when name is empty', () => {
        expect(validateUserInput('', 'coding')).toBe('Name is required.')
    })

    it('returns an error when hobbies is empty', () => {
        expect(validateUserInput('Ana', '')).toBe('Hobbies are required.')
    })

    it('returns an error when name is only whitespace', () => {
        expect(validateUserInput('   ', 'coding')).toBe('Name is required.')
    })

    it('returns an error when hobbies is only whitespace', () => {
        expect(validateUserInput('Ana', '   ')).toBe('Hobbies are required.')
    })
})

describe('createUser', () => {
    beforeEach(() => resetIdCounter())

    it('trims whitespace from name and hobbies', () => {
        const user = createUser('  Ana  ', '  coding  ')
        expect(user.name).toBe('Ana')
        expect(user.hobbies).toBe('coding')
    })

    it('sets a numeric id', () => {
        const user = createUser('Ana', 'coding')
        expect(typeof user.id).toBe('number')
    })

    it('sets a valid ISO date string for created_at', () => {
        const user = createUser('Ana', 'coding')
        expect(() => new Date(user.created_at)).not.toThrow()
        expect(new Date(user.created_at).toISOString()).toBe(user.created_at)
    })

    it('generates unique ids for different calls', () => {
        const user1 = createUser('Ana', 'coding')
        const user2 = createUser('Carlos', 'painting')
        expect(user1.id).toBe(1)
        expect(user2.id).toBe(2)
    })
})

describe('deleteUser', () => {
    const users: User[] = [
        { id: 1, name: 'Ana', hobbies: 'coding', created_at: '2026-02-25T00:00:00.000Z' },
        { id: 2, name: 'Carlos', hobbies: 'painting', created_at: '2026-02-24T00:00:00.000Z' },
        { id: 3, name: 'Luisa', hobbies: 'hiking', created_at: '2026-02-23T00:00:00.000Z' },
    ]

    it('removes the user with the given id', () => {
        const result = deleteUser(users, 2)
        expect(result.find((u) => u.id === 2)).toBeUndefined()
    })

    it('keeps all other users', () => {
        const result = deleteUser(users, 2)
        expect(result).toHaveLength(2)
        expect(result.find((u) => u.id === 1)).toBeDefined()
        expect(result.find((u) => u.id === 3)).toBeDefined()
    })

    it('returns the same array if id does not exist', () => {
        const result = deleteUser(users, 99)
        expect(result).toHaveLength(3)
    })

    it('does not mutate the original array', () => {
        deleteUser(users, 1)
        expect(users).toHaveLength(3)
    })
})
