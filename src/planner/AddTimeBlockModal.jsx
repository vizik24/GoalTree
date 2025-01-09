import React from 'react';

export default function AddTimeBlockModal({ addTimeBlock }) {
  const [timeBlock, setTimeBlock] = React.useState({
    startTime: 6,
    endTime: 7,
    day: 0, // Default to Sunday
    color: "#ff6347", // Valid hex color code for "tomato"
    title: "Workout",
    width: "4rem",
    recurringTasks: true,
  });

  function handleSave() {
    addTimeBlock(timeBlock);
    document.getElementById("my_modal_5").close();
  }

  function handleCancel() {
    document.getElementById("my_modal_5").close();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setTimeBlock((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCheckChange(event) {
    setTimeBlock((prev) => ({
      ...prev,
      recurringTasks: event.target.checked,
    }));
  }

  return (
    <dialog className="modal" id="my_modal_5">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add Time Block</h3>
        <div className="py-4">
          <input
            type="text"
            name="title"
            value={timeBlock.title}
            onChange={handleChange}
            placeholder="Title"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="number"
            name="startTime"
            value={timeBlock.startTime}
            onChange={handleChange}
            placeholder="Start Time"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="number"
            name="endTime"
            value={timeBlock.endTime}
            onChange={handleChange}
            placeholder="End Time"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="number"
            name="day"
            value={timeBlock.day}
            onChange={handleChange}
            placeholder="Day (0-6)"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="color"
            name="color"
            value={timeBlock.color}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
          <label className="cursor-pointer label">
            <span className="label-text">Recurring Tasks</span>
            <input
              type="checkbox"
              name="recurringTasks"
              checked={timeBlock.recurringTasks}
              onChange={handleCheckChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <div className="modal-action">
          <button onClick={handleSave} className="btn btn-primary">Save</button>
          <button onClick={handleCancel} className="btn">Cancel</button>
        </div>
      </div>
    </dialog>
  );
}