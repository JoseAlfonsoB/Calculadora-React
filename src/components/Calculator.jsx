// src/components/Calculator.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Delete } from 'lucide-react';
import Display from './Display';
import Button from './Button';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // Centralizamos la lógica de procesamiento para que la usen tanto los clicks como el teclado
    const processInput = (value) => {
        if (value === 'C' || value === 'Clear') {
            setInput('');
            setResult('');
        } else if (value === '⌫' || value === 'Backspace') {
            setInput((prev) => prev.slice(0, -1));
        } else if (value === '=' || value === 'Enter') {
            try {
                if (!input) return;
                const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
                const evalResult = new Function(`return ${sanitizedInput}`)();
                setResult(Number(evalResult).toString());
            } catch (error) {
                setResult('Error');
            }
        } else {
            // Definimos los operadores permitidos en pantalla
            const operators = ['+', '-', '×', '÷', '.'];
            if (operators.includes(value) && operators.includes(input.slice(-1))) {
                return;
            }
            setInput((prev) => prev + value);
        }
    };

    // Manejador para los clicks de la interfaz visual
    const handleButtonClick = (value) => {
        if (value && typeof value === 'object') {
            if (value.type === RotateCcw) return processInput('C');
            if (value.type === Delete) return processInput('⌫');
        }
        processInput(value);
    };

    // Escuchador del teclado físico con useEffect
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            // Mapeamos teclas del teclado físico a los caracteres que usa nuestra app
            if (/[0-9.]/.test(key)) {
                processInput(key);
            } else if (key === '+') {
                processInput('+');
            } else if (key === '-') {
                processInput('-');
            } else if (key === '*') {
                processInput('×'); // Usamos el operador visual
            } else if (key === '/') {
                event.preventDefault(); // Evita que abra la búsqueda rápida en algunos navegadores
                processInput('÷'); // Usamos el operador visual
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                processInput('Enter');
            } else if (key === 'Backspace') {
                processInput('Backspace');
            } else if (key === 'Escape') {
                processInput('Clear');
            }
        };

        // Añadimos el evento global al documento
        window.addEventListener('keydown', handleKeyDown);

        // CRUCIAL: Limpiamos el evento cuando el componente se desmonte para evitar fugas de memoria
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]); // Escuchamos los cambios en 'input' para que la función capture el estado actualizado

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-sm bg-neutral-900 p-6 rounded-[36px] shadow-2xl border border-neutral-800"
        >
            <Display input={input} result={result} />

            <div className="grid grid-cols-4 gap-3">
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