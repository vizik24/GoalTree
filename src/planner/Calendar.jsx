import { useEffect, useState } from "react";
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TimeBlock from "./TimeBlock";

const ItemTypes = {
  TIMEBLOCK: 'timeblock',
};

function WeekCalendar({ dayStart, dayEnd, onDrop, timeBlocks }) {
  const duration = dayEnd - dayStart;
  const hours = Array.from({ length: duration + 1 }, (_, i) => dayStart + i);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 6000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentDay = currentTime.getDay(); // 0 (Sunday) to 6 (Saturday)

  const linePosition =
    (((currentHour + 0.5 - dayStart) * 60 + currentMinutes) /
      ((dayEnd - dayStart + 1) * 60)) *
    100;

  return (
    <div className="overflow-x-auto" style={{ position: "relative" }}>
      <table className="table bg-white text-neutral-content">
        {/* head */}
        <thead>
          <tr className="border-neutral-content">
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {hours.map((hour) => (
            <tr key={hour} className="border-neutral-content">
              <td>{hour}:00</td>
              {/* columns */}
              {Array.from({ length: 7 }).map((_, index) => (
                <DropCell key={index} day={index} hour={hour} onDrop={onDrop} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="absolute w-full bg-primary"
        style={{
          top: `${linePosition}%`,
          height: "1px", // Reduce height for a thinner line
          transform: "translateY(-0.5px)", // Adjust position to align perfectly
        }}
      ></div>
      {timeBlocks.map((block) => (
        <TimeBlock
          key={block.id}
          settings={block}
          onDragStop={onDrop}
        />
      ))}
    </div>
  );
}

function DropCell({ day, hour, onDrop }) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TIMEBLOCK,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropTarget = monitor.getDropTarget();
      const dropTargetRect = dropTarget.getBoundingClientRect();

      const deltaX = clientOffset.x - dropTargetRect.left;
      const deltaY = clientOffset.y - dropTargetRect.top;

      onDrop(item, deltaX, deltaY, day, hour);
    },
  }));

  return <td ref={drop} style={{ height: "40px", width: "100px" }}></td>;
}

export default function Calendar({ timeBlocks, updateTimeBlock }) {
  const handleDrop = (item, deltaX, deltaY, day, hour) => {
    const cellHeight = 40; // Row height in pixels
    const cellWidth = 100; // Column width in pixels

    const newDay = Math.round((item.day * cellWidth + deltaX) / cellWidth);
    const newStartTime = Math.round((item.startTime * cellHeight + deltaY) / cellHeight) + 6; // Adjust for dayStart

    // Prevent dragging outside valid bounds (e.g., negative values or beyond limits)
    const validStartTime = Math.max(newStartTime, 6); // Assuming dayStart = 6
    const validDay = Math.max(0, Math.min(newDay, 6)); // 0 = Sunday, 6 = Saturday

    // Update block settings
    updateTimeBlock(item.id, {
      startTime: validStartTime,
      endTime: validStartTime + (item.endTime - item.startTime),
      day: validDay,
    });

    console.log("Dropped on day:", validDay, 'startTime: ', validStartTime, "hour:", item.endTime);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: "relative" }}>
        <WeekCalendar dayStart={6} dayEnd={22} onDrop={handleDrop} timeBlocks={timeBlocks} />
      </div>
    </DndProvider>
  );
}