export default function ShowCompletedToggle({handleToggle, toggleValue}) {
    return(
        
  <label className="label cursor-pointer inline-flex z-10 absolute right-10 top-5">
    <span className="label-text  mr-5">Show completed </span>
    <input type="checkbox" className="toggle toggle-success" checked={toggleValue} onChange={handleToggle}/>
  </label>

    )
}