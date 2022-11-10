import React from 'react'
import { useState } from 'react';

const CardProgress = ({ progress, setProgress, list }) => {

    const [previewProgress, setPreviewProgress] = useState(0);

    const handleProgressChange = (v) => () => setProgress(v);
    const handlePreviewProgressChange = (v) => () => setPreviewProgress(v);

    return (
        <div className={`flex items-center space-x-2 px-3 pl-4 ${list && 'absolute top-16 py-2 h-22 -left-28 z-50 bg-white rounded-md before:absolute '}`}>
            {[...Array(5).keys()].map((itemIndex) => (
                <div
                    key={itemIndex}
                    onMouseOver={handlePreviewProgressChange(itemIndex)}
                    onClick={handleProgressChange(itemIndex)}
                    onMouseOut={handlePreviewProgressChange(0)}
                    className={getStatusClassName(itemIndex)}
                >
                    {itemIndex * 25}%
                </div>
            ))}
        </div>
    );

    function getStatusClassName(itemIndex) {
        return `p-2 duration-300 ${progress >= itemIndex || previewProgress >= itemIndex
            ? "bg-teal-500"
            : "bg-gray-200"
            } rounded-lg cursor-pointer ${progress >= itemIndex || previewProgress >= itemIndex
                ? "text-white"
                : "bg-gray-200"
            } ${itemIndex === 0
                ? "rounded-tl-3xl rounded-bl-3xl"
                : itemIndex === 4
                    ? "rounded-tr-3xl rounded-br-3xl"
                    : ""
            }`;
    }
}

export default CardProgress