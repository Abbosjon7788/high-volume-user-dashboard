export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    age: number
    department: string
    joinedAt: string
    isActive: boolean
}

import {LAST_NAMES, FIRST_NAMES, DEPARTMENTS} from '../constants/user.constants';


function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(start: Date, end: Date): string {
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return d.toISOString().split('T')[0]
}

export function generateUsers(count: number): User[] {
    const users: User[] = []
    for (let i = 0; i < count; i++) {
        const firstName = pick(FIRST_NAMES)
        const lastName = pick(LAST_NAMES)
        users.push({
            id: crypto.randomUUID(),
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
            age: 18 + Math.floor(Math.random() * 50),
            department: pick(DEPARTMENTS),
            joinedAt: randomDate(new Date(2015, 0, 1), new Date(2025, 0, 1)),
            isActive: Math.random() > 0.2,
        })
    }
    return users
}
