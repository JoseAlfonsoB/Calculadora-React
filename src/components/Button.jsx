// src/components/Button.jsx
import React from 'react';

export default function Button({ value, onClick, variant = 'number' }) {
    // Definimos estilos base y variantes con Tailwind CSS
    const baseStyles = "h-16 text-xl font-semibold rounded-2xl transition-all duration-150 active:scale-95 shadow-md";

    const variants = {
        number: "bg-neutral-800 text-white hover:bg-neutral-700",
        operator: "bg-amber-500 text-white hover:bg-amber-400",
        action: "bg-neutral-400 text-neutral-900 hover:bg-neutral-300",
        equals: "bg-amber-600 text-white hover:bg-amber-500 col-span-2", // Ocupa dos columnas
    };

    return (
        <button
            onClick={() => onClick(value)}
            className={`${baseStyles} ${variants[variant] || variants.number}`}
        >
            {value}
        </button>
    );
}