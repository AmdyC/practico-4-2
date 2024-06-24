import React, { useState } from 'react';
import './App.css';

function App() {
  // Estados para manejar los valores de entrada
  const [cashPrice, setCashPrice] = useState('');
  const [installmentPrice, setInstallmentPrice] = useState('');
  const [installments, setInstallments] = useState('');
  const [monthlyInflation, setMonthlyInflation] = useState('');
  const [result, setResult] = useState(null);

  // Función para manejar el cálculo
  const calculateBestOption = () => {
    const cashPriceValue = parseFloat(cashPrice);
    const installmentPriceValue = parseFloat(installmentPrice);
    const installmentsValue = parseInt(installments, 10);
    const monthlyInflationRate = parseFloat(monthlyInflation) / 100;

    // Validar los inputs
    if (isNaN(cashPriceValue) || isNaN(installmentPriceValue) || isNaN(installmentsValue) || isNaN(monthlyInflationRate)) {
      alert('Por favor, ingresa valores válidos en todos los campos.');
      return;
    }

    // Cálculo del valor presente de cada cuota ajustada por inflación
    let presentValueSum = 0;
    for (let i = 1; i <= installmentsValue; i++) {
      const adjustedInstallment = installmentPriceValue / installmentsValue / Math.pow(1 + monthlyInflationRate, i);
      presentValueSum += adjustedInstallment;
    }

    // Comparar y decidir la mejor opción
    const decision = presentValueSum < cashPriceValue ? 'cuotas' : 'contado';

    // Establecer el resultado
    setResult({
      presentValueSum: presentValueSum.toFixed(2),
      cashPriceValue: cashPriceValue.toFixed(2),
      decision: decision
    });
  };

  return (
    <div className="App">
      <h1>Calculadora de Compra</h1>
      <div>
        <label>
          Precio de contado:
          <input
            type="number"
            value={cashPrice}
            onChange={(e) => setCashPrice(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Precio total en cuotas:
          <input
            type="number"
            value={installmentPrice}
            onChange={(e) => setInstallmentPrice(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Cantidad de cuotas:
          <input
            type="number"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Estimación de inflación mensual (%):
          <input
            type="number"
            value={monthlyInflation}
            onChange={(e) => setMonthlyInflation(e.target.value)}
          />
        </label>
      </div>
      <button onClick={calculateBestOption}>Calcular</button>

      {result && (
        <div>
          <h2>Resultado</h2>
          <p>Precio de contado: ${result.cashPriceValue}</p>
          <p>Valor presente total de las cuotas: ${result.presentValueSum}</p>
          <p>Es más conveniente pagar al: {result.decision}</p>
        </div>
      )}
    </div>
  );
}

export default App;
