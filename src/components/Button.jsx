// src/components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ value, onClick, variant = 'number' }) {
    const baseStyles = "h-16 text-xl font-semibold rounded-2xl flex items-center justify-center transition-colors duration-150 shadow-md select-none";

    const variants = {
        number: "bg-neutral-800 text-white hover:bg-neutral-700",
        operator: "bg-amber-500 text-white hover:bg-amber-400",
        action: "bg-neutral-700 text-neutral-200 hover:bg-neutral-600",
        equals: "bg-amber-600 text-white hover:bg-amber-500 col-span-2",
    };

    return (
        <motion.button
            onClick={() => onClick(value)}
            className={`${baseStyles} ${variants[variant] || variants.number}`}
            // Animaciones interactivas con Framer Motion
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {value}
        </motion.button>
    );
}