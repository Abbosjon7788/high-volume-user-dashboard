import {useRef, useMemo, useCallback} from 'react'
import {useVirtualizer} from '@tanstack/react-virtual'
import {useUserStore, type SortField} from '../store/userStore'
import {filterAndSortUsers} from '../store/selectors'
import {UserRow} from './UserRow'
import type {User} from '../utils/generateUsers'

const ROW_HEIGHT = 48 as const;

const COLUMNS: { label: string; field: SortField; cls: string }[] = [
    {label: 'Name', field: 'firstName', cls: 'cell-name'},
    {label: 'Email', field: 'email', cls: 'cell-email'},
    {label: 'Age', field: 'age', cls: 'cell-age'},
    {label: 'Department', field: 'department', cls: 'cell-dept'},
] as const;

export function UsersTable() {
    const parentRef = useRef<HTMLDivElement>(null)

    const {
        users,
        search,
        sortField,
        sortDirection,
        departmentFilter,
        setSort,
        setSelectedUser
    } = useUserStore((store) => store)

    const filtered = useMemo(
        () => filterAndSortUsers(users, search, sortField, sortDirection, departmentFilter),
        [users, search, sortField, sortDirection, departmentFilter],
    )

    const virtualizer = useVirtualizer({
        count: filtered.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ROW_HEIGHT,
        overscan: 5,
    })

    const handleRowClick = useCallback(
        (user: User) => setSelectedUser(user),
        [setSelectedUser],
    )

    if (filtered.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">∅</div>
                <p>No users match your criteria.</p>
            </div>
        )
    }

    return (
        <div className="table-container">
            <div className="table-header">
                {COLUMNS.map((col) => (
                    <span
                        key={col.field}
                        className={`cell ${col.cls} sortable`}
                        onClick={() => setSort(col.field)}
                    >
            {col.label}
                        {sortField === col.field ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
          </span>
                ))}
                <span className="cell cell-status">Status</span>
            </div>

            <div ref={parentRef} className="table-body">
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizer.getVirtualItems().map((vRow) => {
                        const user = filtered[vRow.index]
                        return (
                            <UserRow
                                key={user.id}
                                user={user}
                                onClick={handleRowClick}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: ROW_HEIGHT,
                                    transform: `translateY(${vRow.start}px)`,
                                }}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="table-footer">
                {filtered.length.toLocaleString()} users
            </div>
        </div>
    )
}
