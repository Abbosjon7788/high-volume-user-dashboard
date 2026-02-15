import {create} from 'zustand'
import {generateUsers, type User} from '../utils/generateUsers'

export type SortField = 'firstName' | 'lastName' | 'email' | 'age' | 'department'
export type SortDirection = 'asc' | 'desc'

interface UserState {
    users: User[]
    isLoading: boolean
    error: string | null
    search: string
    sortField: SortField
    sortDirection: SortDirection
    departmentFilter: string
    selectedUser: User | null
    toastMessage: string | null

    initialize: () => void
    setSearch: (search: string) => void
    setSort: (field: SortField) => void
    setDepartmentFilter: (dept: string) => void
    setSelectedUser: (user: User | null) => void
    updateUser: (updated: User) => Promise<void>
    setToast: (msg: string | null) => void
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    search: '',
    sortField: 'firstName',
    sortDirection: 'asc',
    departmentFilter: '',
    selectedUser: null,
    toastMessage: null,

    initialize: () => {
        set({isLoading: true, error: null})
        setTimeout(() => {
            try {
                const users = generateUsers(10_000)
                set({users, isLoading: false})
            } catch {
                set({error: 'Failed to generate users.', isLoading: false})
            }
        }, 800)
    },

    setSearch: (search) => set({search}),

    setSort: (field) => {
        const {sortField, sortDirection} = get()
        if (sortField === field) {
            set({sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'})
        } else {
            set({sortField: field, sortDirection: 'asc'})
        }
    },

    setDepartmentFilter: (dept) => set({departmentFilter: dept}),
    setSelectedUser: (user) => set({selectedUser: user}),
    setToast: (msg) => set({toastMessage: msg}),

    updateUser: async (updated) => {
        const prev = get().users
        const prevSelected = get().selectedUser

        set({
            users: prev.map((u) => (u.id === updated.id ? updated : u)),
            selectedUser: updated,
        })

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.3) {
                    set({
                        users: prev,
                        selectedUser: prevSelected,
                        toastMessage: 'Update failed — changes rolled back.',
                    })
                    reject(new Error('Simulated failure'))
                } else {
                    set({toastMessage: 'User updated successfully.'})
                    resolve()
                }
            }, 600)
        })
    },
}))
