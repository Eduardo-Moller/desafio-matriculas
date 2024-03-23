export default function Button({ label, action, disabled, ...otherProps }) {
  return (
    <>
      <button
        className="bgPrimaryUni text-white btn btn-lg btn-block w-100"
        type="button"
        onClick={action}
        disabled={disabled}
        {...otherProps}
      >
        {label}
      </button>
    </>
  );
}
