export default function Input({
  label,
  placeholder,
  handleChange,
  value,
  int = false,
  error,
  ...otherProps
}) {
  const onChange = (value) => {
    if (int) {
      value = value.replace(/[^0-9]/g, "");
    }
    handleChange(value);
  };

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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        {...otherProps}
      />
      {error && <div className="invalid-text-entry py-1 ps-1">{error}</div>}
    </>
  );
}
