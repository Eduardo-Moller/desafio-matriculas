export default function Input({
  label,
  placeholder,
  handleChange,
  value,
  error,
  ...otherProps
}) {
  return (
    <>
      <label htmlFor={otherProps.id} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={otherProps.id}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        {...otherProps}
      />
      {error && <div className="invalid-text-entry py-1 ps-1">{error}</div>}
    </>
  );
}
