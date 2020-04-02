// import dependencies
import React, { useState } from 'react'

const PasswordLength = props => {
    // state hook varialbes
    const [strength, setStrength] = useState('text-success')
    const [value, setValue] = useState(16)

    // destructure props
    const { liftState } = props

    const handleChange = e => {
        // destructure event
        const { value } = e.target

        // lift state
        liftState(value)

        // update state
        setValue(value)
        if (value < 12) {
            setStrength('text-danger')
        } else if (value < 16) {
            setStrength('text-warning')
        } else {
            setStrength('text-success')
        }
    }

    return (
        <div className="row my-4 password-length">
            <div className="col text-left">
                <label htmlFor="password-length">Password Length: <span className={strength}>{value}</span></label>
                <input type="range" className="custom-range" min="8" max="128" id="password-length" onChange={handleChange} value={value} />
            </div>
        </div>
    )
}

export default PasswordLength
