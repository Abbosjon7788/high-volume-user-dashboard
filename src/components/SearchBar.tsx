import {useState, useEffect} from 'react'
import {useUserStore} from '../store/userStore'
import {useDebouncedValue} from '../hooks/useDebouncedValue'

export function SearchBar() {
    const setSearch = useUserStore((store) => store.setSearch)
    const [input, setInput] = useState('')
    const debounced = useDebouncedValue(input, 300)

    useEffect(() => {
        setSearch(debounced)
    }, [debounced, setSearch])

    return (
        <input
            name={'search'}
            type="text"
            className="search-input"
            placeholder="Search by name or email…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    )
}
