import logo from './logo.svg';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  
  const [topDisplay, setTopDisplay] = useState('');
  const [currDisplay, setCurrDisplay] = useState('');
  const [first, setFirst] = useState(false);
  const [operator, setOperator] = useState(false);
  const [second, setSecond] = useState(false);
  const [firstNum, setFirstNum] = useState('');
  const [operatorNum, setOperatorNum] = useState('');
  const [secondNum, setSecondNum] = useState('');
  const [dot, setDot] = useState(false);
  const [canType, setCanType] = useState(true);


  useEffect(() => {
    setTopDisplay('');
    setCurrDisplay('');
    setFirst(false);
    setOperator(false);
    setSecond(false);
    setFirstNum('');
    setOperatorNum('');
    setSecondNum('');
    setDot(false);
  }, [])

  useEffect(() => {
    if (operator) {
      setCurrDisplay(secondNum);
      setTopDisplay(`${firstNum} ${operatorNum}`)
    } else {
      setCurrDisplay(`${firstNum} ${operatorNum}`);
    }
  })
  
  const pressNum = (e) => {
    if (canType) {
      if (!operator) {
        setFirst(true);
        setFirstNum((prev) => prev + e);
      } else if (first) {
        setSecond(true);
        setSecondNum((prev) => prev + e);
      }
    }
  }

  const pressOpp = (e) => {
    if (first && !operator) {
      setOperator(true);
      setOperatorNum(e);
      setDot(false);
      setCanType(true);
    }
  }

  const calc = () => {
    let action = topDisplay.slice(topDisplay.length - 1);
    let num1 = topDisplay.slice(0, topDisplay.length - 1);
    let num2 = currDisplay;

    if (action === '+') {
      setFirstNum(+num1 + +num2);
    } else if (action === '-') {
      setFirstNum(+num1 - +num2);
    } else if (action === 'x') {
      setFirstNum(num1 * num2);
    } else if (num2 == 0) {
      setFirstNum('0 DIVISION ERROR');
    } else {
      setFirstNum(num1 / num2);
    }
    setTopDisplay('')
    setFirst(true);
    setOperatorNum('');
    setSecondNum('');
    setOperator(false);
    setSecond(false);
    setDot(false);
    setCanType(false);
  }

  return (
    <div className="App">

      <div className="header">Calculator App!</div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Circle-icons-calculator.svg/1200px-Circle-icons-calculator.svg.png" className="calc-logo" alt="logo" />
      <p>Press the buttons below!</p>

      <div className="container">

<div className='display'>
  <div className='top-display'>{topDisplay}</div>
  <div className='bot-display' >{currDisplay}</div>
</div>

<div className="misc_buttons">
  <button className='clear'  onClick={() => {
    setTopDisplay('');
    setCurrDisplay('');
    setFirst(false);
    setOperator(false);
    setSecond(false); 
    setFirstNum('');
    setOperatorNum('');
    setSecondNum('');
    setDot(false);
    setCanType(true);
    }
  } 
  >clear</button>
  <button className='delete'  onClick={(e) => {
    if (canType) {
      if (second) {
        setSecondNum((prev) => prev.substring(0,prev.length - 1));
      } else if (operator){
        setOperator(false);
        setOperatorNum('');
      } else if (first) {
        setFirstNum((prev) => prev.substring(0,prev.length - 1));
      } else {
        e.preventDefault();
      }
      }
    }
  }
  >delete</button>
</div>

<div className='main_buttons'>
  <div className='row1'>
    <button className='number' onClick={() =>{pressNum('7');}}>7</button>
    <button className='number'  onClick={() =>{pressNum('8');}}>8</button>
    <button className='number'  onClick={() =>{pressNum('9');}}>9</button>
    <button className='operator' onClick={() =>{pressOpp('÷');}}>÷</button>
  </div>
  <div className='row2'>
    <button className='number' onClick={() =>{pressNum('4');}}>4</button>
    <button className='number' onClick={() =>{pressNum('5');}}>5</button>
    <button className='number' onClick={() =>{pressNum('6');}}>6</button>
    <button className='operator' onClick={() =>{pressOpp('x');}}>x</button>
  </div>
  <div className='row3'>
    <button className='number' onClick={() =>{pressNum('1');}}>1</button>
    <button className='number' onClick={() =>{pressNum('2');}}>2</button>
    <button className='number' onClick={() =>{pressNum('3');}}>3</button>
    <button className='operator' onClick={() =>{pressOpp('+');}}>+</button> 
  </div>
  <div className='row4'>
    <button className='number' onClick={() =>{
      if (!dot) {
        pressNum('.');
        setDot(true);
      }
      }}>.</button>
    <button className='number' onClick={() =>{pressNum('0');}}>0</button>
    <button className='operator' onClick={() => {calc();}} >=</button>
    <button className='operator' onClick={() =>{pressOpp('-');}}>-</button>
  </div>

</div>

</div>
      <a
        className="App-link"
        href="https://www.linkedin.com/in/emanuel-lee-3024111aa/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact Me!
      </a>
    </div>
  );
}

export default App;
