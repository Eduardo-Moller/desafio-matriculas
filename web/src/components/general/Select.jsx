import Select from "react-select";

export default function SelectComponent({
  label,
  placeholder,
  options,
  handleChange,
  value,
  fieldOptions,
  error,
  isMulti = false,
  ...otherProps
}) {
  return (
    <>
      <label htmlFor={otherProps.id} className="form-label">
        {label}
      </label>
      <Select
        options={options}
        placeholder={placeholder}
        id={otherProps.id}
        onChange={(selectedOption) => handleChange(selectedOption)}
        value={value}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
        isMulti={isMulti}
        isClearable={true}
        {...otherProps}
      />
      {error && <div className="invalid-text-entry py-1 ps-1">{error}</div>}
    </>
  );
}
