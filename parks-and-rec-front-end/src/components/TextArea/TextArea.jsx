const TextArea = ({name, value, onInputChange}) =>{
  return (
    <div className="mb-3">
    <label htmlFor="description" className="form-label">
      Description
    </label>
    <textarea
      required
      type="text"
      className="form-control"
      placeholder="Description"
      name={name}
      id="description"
      value={value || ""}
      onChange={(e) => onInputChange(e)}
    />
  </div>
  )
}

export default TextArea