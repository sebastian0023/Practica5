export interface User {
    id: number
    name: string
    hobbies: string
    created_at: string
}

let _nextId = 1
export function resetIdCounter() { _nextId = 1 } // exposed for tests

/**
 * Validates the user form inputs.
 * Returns an error message string, or null if valid.
 */
export function validateUserInput(name: string, hobbies: string): string | null {
    if (!name.trim()) return 'Name is required.'
    if (!hobbies.trim()) return 'Hobbies are required.'
    return null
}

/**
 * Creates a new User object from the given inputs.
 * Uses Date.now() for the id and new Date() for created_at.
 */
export function createUser(name: string, hobbies: string): User {
    return {
        id: _nextId++,
        name: name.trim(),
        hobbies: hobbies.trim(),
        created_at: new Date().toISOString(),
    }
}

/**
 * Removes a user from the list by id.
 */
export function deleteUser(users: User[], id: number): User[] {
    return users.filter((u) => u.id !== id)
}
