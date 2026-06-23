// src/App.jsx
import React from 'react';
import Calculator from './components/Calculator';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-2xl font-bold mb-6 tracking-wide opacity-80">
        Calculadora Web con React
      </h1>
      <Calculator />
    </div>
  );
}