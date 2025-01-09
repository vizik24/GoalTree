import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import TimeBlock from "./TimeBlock";
import Toolbar from "./Toolbar";
import AddTimeBlockModal from "./AddTimeBlockModal";

export default function Planner() {
  const [periodSliderValue, setValue] = useState(25);

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const [timeBlocks, setTimeBlocks] = useState([
    {
      id: 1,
      startTime: 9,
      endTime: 11,
      day: 2,
      color: "#f0a",
      title: "Meeting",
    },
  ]);

  const addTimeBlock = (blockSettings) => {
    setTimeBlocks((prevBlocks) => [
      ...prevBlocks,
      { ...blockSettings, id: prevBlocks.length + 1 },
    ]);
  };

  const updateTimeBlock = (id, updatedSettings) => {
    setTimeBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, ...updatedSettings } : block
      )
    );
  };

  return (
    <div className="mt-10">
      <Toolbar
        periodSliderValue={periodSliderValue}
        handleSliderChange={handleSliderChange}
      />
      <AddTimeBlockModal addTimeBlock={addTimeBlock} />
      <Calendar
        timeBlocks={timeBlocks}
        updateTimeBlock={updateTimeBlock}
      />
    </div>
  );
}
