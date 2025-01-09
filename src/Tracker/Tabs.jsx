export default function Tabs({ Component1, Component2 }) {
  return (
    <div role="tablist" className="tabs tabs-lifted overflow-scroll">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-nowrap bg-base-200"
        aria-label="Panel View"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-300 border-base-300 rounded-box p-6"
      >
       {Component1 && <Component1></Component1>}
      </div>

      <input
      id='my-tabs-2'
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-nowrap bg-base-200"
        aria-label="Tree View"

      />
      <div
        role="tabpanel"
        className="tab-content bg-base-300 border-base-300 rounded-box p-6"
      >
        {Component2 && <Component2></Component2>}
      </div>
      </div>
  )
}
