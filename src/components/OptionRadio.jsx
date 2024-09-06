import React from 'react'

const OptionRadio = (props) => {
    const {
        label,
        onChange,
        checked
    } = props
    
    return (
        <div className="form-control mb-2">
            <label className="label cursor-pointer">
                <input
                    type="radio"
                    name={`question`}
                    className="radio radio-primary"
                    onChange={onChange}
                    checked={checked}
                />
                <span className="label-text ml-2">{label}</span>
            </label>
        </div>
    )
}

export default OptionRadio
