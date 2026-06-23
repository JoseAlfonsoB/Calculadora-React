// src/components/Calculator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Delete } from 'lucide-react';
import Display from './Display';
import Button from './Button';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        // Si el valor es un objeto (un icono de Lucide), identificamos qué acción es por su tipo
        if (value && typeof value === 'object') {
            if (value.type === RotateCcw) {
                setInput('');
                setResult('');
                return;
            }
            if (value.type === Delete) {
                setInput((prev) => prev.slice(0, -1));
                return;
            }
        }

        if (value === '=') {
            try {
                if (!input) return;
                const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
                const evalResult = new Function(`return ${sanitizedInput}`)();
                setResult(Number(evalResult).toString());
            } catch (error) {
                setResult('Error');
            }
        } else {
            const operators = ['+', '-', '×', '÷', '.'];
            if (operators.includes(value) && operators.includes(input.slice(-1))) {
                return;
            }
            setInput((prev) => prev + value);
        }
    };

    return (
        // Agregamos una animación de entrada suave (Fade-in y Slide-up) para la calculadora entera
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-sm bg-neutral-900 p-6 rounded-[36px] shadow-2xl border border-neutral-800"
        >
            <Display input={input} result={result} />

            <div className="grid grid-cols-4 gap-3">
                {/* Usamos los iconos de Lucide pasándolos como componentes React en la propiedad value */}
                <Button value={<RotateCcw size={20} />} onClick={handleButtonClick} variant="action" />
                <Button value={<Delete size={20} />} onClick={handleButtonClick} variant="action" />
                <Button value="÷" onClick={handleButtonClick} variant="operator" />
                <Button value="×" onClick={handleButtonClick} variant="operator" />

                <Button value="7" onClick={handleButtonClick} />
                <Button value="8" onClick={handleButtonClick} />
                <Button value="9" onClick={handleButtonClick} />
                <Button value="-" onClick={handleButtonClick} variant="operator" />

                <Button value="4" onClick={handleButtonClick} />
                <Button value="5" onClick={handleButtonClick} />
                <Button value="6" onClick={handleButtonClick} />
                <Button value="+" onClick={handleButtonClick} variant="operator" />

                <Button value="1" onClick={handleButtonClick} />
                <Button value="2" onClick={handleButtonClick} />
                <Button value="3" onClick={handleButtonClick} />
                <Button value="=" onClick={handleButtonClick} variant="equals" />

                <Button value="0" onClick={handleButtonClick} />
                <Button value="." onClick={handleButtonClick} />
            </div>
        </motion.div>
    );
}