import React from 'react';
import { Check, X } from 'lucide-react';
import clsx from 'clsx';

export default function RecommendationCard({ task, onKeep, onDismiss }) {
    return (
        <div className="bg-[#F0FDF4] border border-green-200 rounded-lg p-3 relative flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    {/* Title */}
                    <div className="text-sm font-bold text-gray-900 leading-tight">
                        {task.title}
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-2 text-xs mt-0.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                            {task.course}
                        </span>
                        <span className="text-gray-600">{task.duration}</span>
                    </div>

                    {/* Reason */}
                    <div className="text-xs text-gray-500 italic mt-1">
                        Why: {task.reason}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-2">
                <button
                    onClick={onKeep}
                    className="flex items-center gap-1.5 bg-[#1F4E3D] hover:bg-[#163a2e] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors shadow-sm"
                >
                    <Check className="w-3.5 h-3.5" />
                    Keep
                </button>
                <button
                    onClick={onDismiss}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs font-medium px-2 py-1"
                >
                    <X className="w-3.5 h-3.5" />
                    Dismiss
                </button>
            </div>
        </div>
    );
}
