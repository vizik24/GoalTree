export default function HelperDropdown({title, description}) {
    return (
        <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
    <svg
      tabIndex={0}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-4 w-4 stroke-current">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  </div>
  <div
    tabIndex={0}
    className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow">
    <div tabIndex={0} className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
    </div>
  </div>
</div>
    )
}