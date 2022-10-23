const InputBar = ({required, type, placeholder, name, id, value, onInputChange}) => {
  return (
    <div className="mb-3">
              <label htmlFor={id} className="form-label">
                {placeholder}
              </label>
              <input
                required={required}
                type={type}
                className="form-control"
                placeholder={placeholder}
                name={name}
                id={id}
                value={value}
                onChange={(e) => onInputChange(e)}
              />
            </div>
  )
}

export default InputBar