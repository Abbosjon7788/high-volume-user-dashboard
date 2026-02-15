import {useUserStore} from '../store/userStore';

import {DEPARTMENTS} from '../constants/user.constants';

export function Filters() {
    const {setDepartmentFilter, departmentFilter} = useUserStore((store) => store)

    return (
        <select
            id={'filter'}
            name={'filter'}
            className="filter-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
        >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
            ))}
        </select>
    )
}
