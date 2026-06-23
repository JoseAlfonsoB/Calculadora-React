// src/components/Calculator.jsx
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // Manejador de clicks para los botones
    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '⌫') {
            setInput((prev) => prev.slice(0, -1));
        } else if (value === '=') {
            try {
                // Validación básica antes de evaluar de forma segura
                if (!input) return;

                // Reemplazamos los símbolos visuales por operadores reales de JS
                const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');

                // Evaluamos la expresión de manera segura usando Function
                const evalResult = new Function(`return ${sanitizedInput}`)();

                setResult(Number(evalResult).toString());
            } catch (error) {
                setResult('Error');
            }
        } else {
            // Evitar que se junten operadores seguidos fácilmente
            const operators = ['+', '-', '×', '÷', '.'];
            if (operators.includes(value) && operators.includes(input.slice(-1))) {
                return;
            }
            setInput((prev) => prev + value);
        }
    };

    return (
        <div className="w-full max-w-sm bg-neutral-900 p-6 rounded-[36px] shadow-2xl border border-neutral-800">
            {/* Componente Display */}
            <Display input={input} result={result} />

            {/* Grid de Botones Reutilizados */}
            <div className="grid grid-cols-4 gap-3">
                {/* Fila 1: Acciones limpias */}
                <Button value="C" onClick={handleButtonClick} variant="action" />
                <Button value="⌫" onClick={handleButtonClick} variant="action" />
                <Button value="÷" onClick={handleButtonClick} variant="operator" />
                <Button value="×" onClick={handleButtonClick} variant="operator" />

                {/* Fila 2 */}
                <Button value="7" onClick={handleButtonClick} />
                <Button value="8" onClick={handleButtonClick} />
                <Button value="9" onClick={handleButtonClick} />
                <Button value="-" onClick={handleButtonClick} variant="operator" />

                {/* Fila 3 */}
                <Button value="4" onClick={handleButtonClick} />
                <Button value="5" onClick={handleButtonClick} />
                <Button value="6" onClick={handleButtonClick} />
                <Button value="+" onClick={handleButtonClick} variant="operator" />

                {/* Fila 4 */}
                <Button value="1" onClick={handleButtonClick} />
                <Button value="2" onClick={handleButtonClick} />
                <Button value="3" onClick={handleButtonClick} />

                {/* El botón "=" se expande en el grid gracias a los estilos de su variante */}
                <Button value="=" onClick={handleButtonClick} variant="equals" />

                {/* Fila 5 */}
                <Button value="0" onClick={handleButtonClick} />
                <Button value="." onClick={handleButtonClick} />
            </div>
        </div>
    );
}