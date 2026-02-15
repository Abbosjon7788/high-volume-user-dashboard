import {useEffect} from 'react'
import {useUserStore} from './store/userStore'
import {SearchBar} from './components/SearchBar'
import {Filters} from './components/Filters'
import {UsersTable} from './components/UsersTable'
import {UserModal} from './components/UserModal'
import {Toast} from './components/Toast'

export default function App() {
    const {initialize, isLoading, error} = useUserStore((store) => store)

    useEffect(() => {
        initialize()
    }, [initialize])

    if (isLoading) {
        return (
            <div className="state-screen">
                <div className="spinner"/>
                <p>Generating 10,000 users…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="state-screen">
                <div className="error-icon">!</div>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Users Dashboard</h1>
                <div className="toolbar">
                    <SearchBar/>
                    <Filters/>
                </div>
            </header>
            <main className="app-main">
                <UsersTable/>
            </main>
            <UserModal/>
            <Toast/>
        </div>
    )
}
