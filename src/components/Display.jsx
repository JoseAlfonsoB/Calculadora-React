// src/components/Display.jsx
import React from 'react';

export default function Display({ input, result }) {
    return (
        <div className="w-full bg-neutral-950 p-6 rounded-3xl flex flex-col justify-end items-end min-h-[110px] mb-6 shadow-inner overflow-hidden break-all">
            {/* Historial o entrada actual */}
            <span className="text-neutral-500 text-sm tracking-wide min-h-[20px]">
                {input || '0'}
            </span>
            {/* Resultado principal */}
            <span className="text-white text-4xl font-light mt-1">
                {result || '0'}
            </span>
        </div>
    );
}