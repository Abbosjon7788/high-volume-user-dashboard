import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Input(props: InputProps) {
    const {label, className, name, type = 'text', ...rest} = props;

    return <div className={'input-field'}>
        {label && <label htmlFor={name}>{label}</label>}
        <input id={name} name={name} type={type} className={`search-input ${className}`} {...rest} />
    </div>

}