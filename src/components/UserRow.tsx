import {memo,} from 'react'
import type {User} from '../utils/generateUsers'

interface Props {
    user: User
    style: React.CSSProperties
    onClick: (user: User) => void
}

export const UserRow = memo(function UserRow({user, style, onClick}: Props) {

    return (
        <div className="table-row" style={style} onClick={() => onClick(user)}>
      <span className="cell cell-name">
        {user.firstName} {user.lastName}
      </span>
            <span className="cell cell-email">{user.email}</span>
            <span className="cell cell-age">{user.age}</span>
            <span className="cell cell-dept">{user.department}</span>
            <span className={`cell cell-status ${user.isActive ? 'active' : 'inactive'}`}>
        {user.isActive ? 'Active' : 'Inactive'}
      </span>
        </div>
    )
})
