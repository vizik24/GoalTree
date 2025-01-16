/**
 * Tabs component that renders two tabbed views.
 * 
 * The following is handled in this component:
 *  - Renders two tabs with radio inputs for switching between views.
 *  - Displays the content of `Component1` in the first tab.
 *  - Displays the content of `Component2` in the second tab.
 * 
 * Props:
 *  - `Component1`: A React component to be rendered in the first tab.
 *  - `Component2`: A React component to be rendered in the second tab.
 * 
 * This component provides a tabbed interface for switching between two different views.
 */
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
