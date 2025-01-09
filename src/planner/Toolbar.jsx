import { useState } from 'react';


function AddTimeBlockButton() {
    const handleOpenModal = () => {
        document.getElementById('my_modal_5').showModal();
      };

  return (
    <button onClick={handleOpenModal} className="btn btn-circle btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function AddTaskButton() {
  return (
    <button className="btn btn-circle btn-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}




function Slider({periodSliderValue, handleSliderChange}) {
   

    return (
        <>
            <input
                type="range"
                min={0}
                max="100"
                value={periodSliderValue}
                className="range"
                step="25"
                onChange={handleSliderChange}
            />
            <div className="flex w-full justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
        </>
    );
}

export default function Toolbar({periodSliderValue, handleSliderChange, modalVisibilty, handleClick}) {
  return (
    <div className="bg-white rounded-2xl h-16 mb-2 justify-items-center items-center grid grid-cols-12 grid-rows-1">
      <div>
        <AddTimeBlockButton />
      </div>
      <div>
        <AddTaskButton />
      </div>
      <div className="col-start-10 col-end-13">
        <Slider periodSliderValue={periodSliderValue} handleSliderChange={handleSliderChange} />
      </div>
    </div>
  );
}
