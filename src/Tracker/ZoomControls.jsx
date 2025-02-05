import React from 'react';
import { Plus, Minus } from 'lucide-react';

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
return (
    <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <button
            onClick={onZoomIn}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-primary"
            aria-label="Zoom in"
        >
            <Plus className="w-6 h-6 text-gray-600" />
        </button>
        <button
            onClick={onZoomOut}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-primary"
            aria-label="Zoom out"
        >
            <Minus className="w-6 h-6 text-gray-600" />
        </button>
    </div>
);
};

export default ZoomControls;

