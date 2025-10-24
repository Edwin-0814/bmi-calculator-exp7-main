import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [bmi, setBmi] = useState('');
  const [status, setStatus] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'ft'

  const calculateBMI = () => {
    let heightInMeters;
    
    if (heightUnit === 'cm') {
      heightInMeters = heightCm / 100; // Convert cm to meters
    } else {
      // Convert feet and inches to meters
      const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn || 0);
      heightInMeters = totalInches * 0.0254;
    }
    
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setStatus('Normal Weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setStatus('Overweight');
    } else {
      setStatus('Obese');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>BMI Calculator</h1>
        <div className="input-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        
        <div className="height-selector">
          <label>Height Unit:</label>
          <div className="unit-buttons">
            <button 
              className={heightUnit === 'cm' ? 'active' : ''} 
              onClick={() => setHeightUnit('cm')}
            >
              Centimeters
            </button>
            <button 
              className={heightUnit === 'ft' ? 'active' : ''} 
              onClick={() => setHeightUnit('ft')}
            >
              Feet & Inches
            </button>
          </div>
        </div>

        {heightUnit === 'cm' ? (
          <div className="input-group">
            <label>Height (cm):</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="Enter height in cm"
            />
          </div>
        ) : (
          <div className="feet-inches">
            <div className="input-group">
              <label>Feet:</label>
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                placeholder="Feet"
              />
            </div>
            <div className="input-group">
              <label>Inches:</label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                placeholder="Inches"
              />
            </div>
          </div>
        )}
        
        <button className="calculate-btn" onClick={calculateBMI}>Calculate BMI</button>
        {bmi && (
          <div className="result">
            <h2>Your BMI is: {bmi}</h2>
            <p>Status: {status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
