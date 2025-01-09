import React from 'react';
import Draggable from 'react-draggable';

function TimeBlock({ settings, onDragStop }) {
  const duration = settings.endTime - settings.startTime;
  const height = `${duration * 40}px`; // Convert duration to pixels

  return (
    <Draggable
      bounds="parent"
      grid={[100, 40]} // Snap to grid
      onStop={(e, data) => onDragStop(e, data, settings)}
    >
      <div
        style={{
          position: "absolute",
          top: `${(settings.startTime - 6) * 40}px`, // Offset by dayStart
          left: `${settings.day * 100}px`,
          height,
          width: "100px",
          backgroundColor: settings.color,
          borderRadius: "0.2rem",
        }}
      >
        {settings.title}
      </div>
    </Draggable>
  );
}

export default TimeBlock;