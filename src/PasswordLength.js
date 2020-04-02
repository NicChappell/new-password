// import dependencies
import React, { useState } from 'react'

const PasswordLength = props => {
    // state hook varialbes
    const [strength, setStrength] = useState('text-success')
    const [numberValue, setNumberValue] = useState(16)
    const [rangeValue, setRangeValue] = useState(16)

    // destructure props
    const { liftState } = props

    const handleNumberBlur = e => {
        // destructure event
        const { value } = e.target

        // update state
        if (value < 8) {
            setNumberValue(8)
        } else if (value > 128) {
            setNumberValue(128)
        }
    }

    const handleNumberChange = e => {
        // destructure event
        const { value } = e.target

        if (!value) {
            // update state
            setStrength('text-danger')
            setNumberValue('')
            setRangeValue(8)

            // lift state
            liftState(8)
        } else if (value < 8) {
            // update state
            setStrength('text-danger')
            setNumberValue(value)
            setRangeValue(8)

            // lift state
            liftState(8)
        } else if (value < 12) {
            // update state
            setStrength('text-danger')
            setNumberValue(value)
            setRangeValue(value)

            // lift state
            liftState(value)
        } else if (value < 16) {
            // update state
            setStrength('text-warning')
            setNumberValue(value)
            setRangeValue(value)

            // lift state
            liftState(value)
        } else if (value > 128) {
            // update state
            setStrength('text-success')
            setNumberValue(value)
            setRangeValue(128)

            // lift state
            liftState(128)
        } else {
            // update state
            setStrength('text-success')
            setNumberValue(value)
            setRangeValue(value)

            // lift state
            liftState(value)
        }
    }

    const handleRangeChange = e => {
        // destructure event
        const { value } = e.target

        // lift state
        liftState(value)

        // update state
        setNumberValue(value)
        setRangeValue(value)
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
                <label htmlFor="password-length">
                    <span>Password Length:</span>
                    <input
                        className={`form-control ${strength}`}
                        min="8"
                        max="128"
                        onBlur={handleNumberBlur}
                        onChange={handleNumberChange}
                        type="number"
                        value={numberValue}
                    />
                </label>
                <input
                    className="custom-range"
                    id="password-length"
                    min="8"
                    max="128"
                    onChange={handleRangeChange}
                    type="range"
                    value={rangeValue}
                />
            </div>
        </div>
    )
}

export default PasswordLength
