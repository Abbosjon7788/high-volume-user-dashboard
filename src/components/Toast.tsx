import {useEffect} from 'react'
import {useUserStore} from '../store/userStore'

export function Toast() {
    const {toastMessage: message, setToast} = useUserStore((store) => store)

    useEffect(() => {
        if (!message) return
        const id = setTimeout(() => setToast(null), 3000)
        return () => clearTimeout(id)
    }, [message, setToast])

    if (!message) return null

    const isError = message.toLowerCase().includes('failed') || message.toLowerCase().includes('rolled back')

    return (
        <div className={`toast ${isError ? 'toast-error' : 'toast-success'}`}>
            {message}
        </div>
    )
}
