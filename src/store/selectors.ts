import type { User } from '../utils/generateUsers'
import type { SortField, SortDirection } from './userStore'

export function filterAndSortUsers(
  users: User[],
  search: string,
  sortField: SortField,
  sortDirection: SortDirection,
  departmentFilter: string,
): User[] {
  let result = users

  if (departmentFilter) {
    result = result.filter((u) => u.department === departmentFilter)
  }

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }

  return [...result].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
    }
    return 0
  })
}
