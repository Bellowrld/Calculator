import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import './style.css';

export default function App() {
  //STATES
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState('');
  const [current, setCurrent] = useState('');
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  // CALCULATOR FUNCTIONS
  const numb = (e) => {
    if (current.includes('.') && e.target.innerHTML === '.') return;

    if (total) {
      setPrevious('');
    }
    current
      ? setCurrent((pre) => pre + e.target.innerHTML)
      : setCurrent(e.target.innerHTML);
    setTotal(false);
  };
  //USING useEffect TO DISPLAY
  useEffect(() => {
    setDisplay(current);
  }, [current]);

  useEffect(() => {
    setDisplay('0');
  }, []);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerHTML);
    if (current === '') return;
    if (previous !== '') {
      equals();
    } else {
      setPrevious(current);
      setCurrent('');
    }
  };

  const equals = (e) => {
    if (e?.target.innerHTML === '=');
    setTotal(true);
    //SETTING COMPUTATION
    let computation;
    switch (operator) {
      case '/':
        computation = String(parseFloat(previous) / parseFloat(current));
        break;
      case 'x':
        computation = String(parseFloat(previous) * parseFloat(current));
        break;
      case '-':
        computation = String(parseFloat(previous) - parseFloat(current));
        break;
      case '+':
        computation = String(parseFloat(previous) + parseFloat(current));
        break;
      default:
        return;
    }
    setDisplay('');
    setPrevious(computation);
    setCurrent('');
  };

  const del = (e) => {
    setCurrent(e.target.innerHTML.toString().slice(0, -1));
    setDisplay('0');
    setPrevious(e.target.innerHTML.toString().slice(0, -1));
    setDisplay('0');
  };

  const clear = () => {
    setPrevious('');
    setCurrent('');
    setDisplay('0');
  };

  return (
    <div className="wrapper">
      <div className="input-screen">
        {display !== '' || display === '0' ? (
          <NumericFormat
            value={display}
            displayType={'text'}
            thousandSeparator={true}
          />
        ) : (
          <NumericFormat
            value={previous}
            displayType={'text'}
            thousandSeparator={true}
          />
        )}
      </div>
      <button className="span-2" id="highlight" onClick={clear}>
        CLEAR
      </button>
      <button id="highlight" onClick={del}>
        DEL
      </button>
      <button id="highlight" onClick={operatorType}>
        /
      </button>
      <button onClick={numb}>7</button>
      <button onClick={numb}>8</button>
      <button onClick={numb}>9</button>
      <button id="highlight" onClick={operatorType}>
        x
      </button>
      <button onClick={numb}>4</button>
      <button onClick={numb}>5</button>
      <button onClick={numb}>6</button>
      <button id="highlight" onClick={operatorType}>
        -
      </button>
      <button onClick={numb}>1</button>
      <button onClick={numb}>2</button>
      <button onClick={numb}>3</button>
      <button id="highlight" onClick={operatorType}>
        +
      </button>
      <button onClick={numb}>.</button>
      <button onClick={numb}>0</button>
      <button className="span-2" id="highlight" onClick={equals}>
        =
      </button>
    </div>
  );
}
