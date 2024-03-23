export default function HomeItem({
  label = "Item 1",
  icon,
  action,
  isPermitted = false,
}) {
  return isPermitted ? (
    <div className="col col-12 col-sm-3 pointer pt-5" onClick={action}>
      <div className="w-100 bgPrimaryUni d-flex flex-column justify-content-center align-items-center p-5 gap-5">
        {icon ? icon : null}
        <h2 className="fs-5 fw-bold text-white">{label}</h2>
      </div>
    </div>
  ) : null;
}
