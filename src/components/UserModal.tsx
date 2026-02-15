import {Fragment, useState} from 'react'
import {useUserStore} from '../store/userStore'
import type {User} from '../utils/generateUsers'
import {Input} from './Input'
import {useForm, type SubmitHandler} from "react-hook-form"


export function UserModal() {
    const {selectedUser, setSelectedUser, updateUser} = useUserStore((store) => store)

    const [draft, setDraft] = useState<User | null>(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const user = draft ?? selectedUser
    if (!user) return null

    const startEdit = () => {
        setDraft({...user})
        setError(null)
    }

    const cancelEdit = () => {
        setDraft(null)
        setError(null)
    }

    const handleSave = async (data: User) => {
        setSaving(true)
        setError(null)
        try {
            await updateUser(data)
            setDraft(null)
        } catch {
            setError('Update failed — changes have been rolled back.')
            setDraft(null)
        } finally {
            setSaving(false)
        }
    }

    const handleCloseModal = () => {
        setSelectedUser(null);
        setDraft(null)
    };

    const isEditing = draft !== null

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? 'Edit User' : 'User Details'}</h2>
                    <button
                        className="modal-close"
                        onClick={handleCloseModal}
                    >
                        ✕
                    </button>
                </div>
                {isEditing ? <UserEditForm
                    user={draft}
                    cancelEdit={cancelEdit}
                    error={error}
                    isSaving={saving}
                    handleSave={handleSave}
                /> : <UserDetailsView
                    user={user}
                    error={error}
                    startEdit={startEdit}
                />}
            </div>
        </div>
    )

}

// ----------------------------------------------------------------------------------

interface UserEditFormProps {
    error: string | null;
    user: User;
    handleSave: (data: User) => void;
    cancelEdit: VoidFunction;
    isSaving: boolean;
}

interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

function UserEditForm(props: UserEditFormProps) {
    const {error, user, isSaving, cancelEdit, handleSave} = props;

    const {
        register,
        handleSubmit,
    } = useForm<UserInput>()

    const onSubmit: SubmitHandler<UserInput> = (data) => {
        handleSave({...user, ...data})
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
            {error && <div className="modal-error">{error}</div>}
            <Input
                label={'First Name'}
                className={'full-width'}
                defaultValue={user.firstName}
                {...register('firstName')}
            />
            <Input
                label={'Last Name'}
                className={'full-width'}
                defaultValue={user.lastName}
                {...register('lastName')}
            />
            <Input
                label={'Email'}
                className={'full-width'}
                defaultValue={user.email}
                {...register('email')}
            />
            <Input
                label={'Age'}
                className={'full-width'}
                defaultValue={user.age}
                type={'number'}
                {...register('age')}
            />
        </div>
        <div className="modal-actions">
            <button type={'button'} className="btn btn-secondary" onClick={cancelEdit} disabled={isSaving}>
                Cancel
            </button>
            <button type={'submit'} className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save'}
            </button>
        </div>
    </form>
}

// ----------------------------------------------------------------------------------

interface UserDetailsProps {
    startEdit: VoidFunction;
    error: string | null;
    user: User
}

function UserDetailsView(props: UserDetailsProps) {
    const {startEdit, error, user} = props;

    return <Fragment>
        <div className="modal-body">
            {error && <div className="modal-error">{error}</div>}
            <div className="modal-field">
                <p>First Name</p>
                <span>{user.firstName}</span>
            </div>
            <div className="modal-field">
                <p>Last Name</p>
                <span>{user.lastName}</span>
            </div>
            <div className="modal-field">
                <p>Email</p>
                <span>{user.email}</span>
            </div>
            <div className="modal-field">
                <p>Age</p>
                <span>{user.age}</span>
            </div>
            <div className="modal-field">
                <p>Department</p>
                <span>{user.department}</span>
            </div>
            <div className="modal-field">
                <p>Joined</p>
                <span>{user.joinedAt}</span>
            </div>
            <div className="modal-field">
                <p>Status</p>
                <span>{user.isActive ? 'Active' : 'Inactive'}</span>
            </div>
        </div>
        <div className="modal-actions">
            <button className="btn btn-primary" onClick={startEdit}>
                Edit
            </button>
        </div>
    </Fragment>
}