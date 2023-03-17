import './App.css';
import OptionSelection from './components/OptionSelection';
import Translation from './components/Translation';
import { arrayItems } from './AIOption';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [option, setOption] = useState({});
  const [response, setResponse] = useState('');

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async (e) => {
    e.preventDefault();
    let object = { ...option, prompt: input };
    console.log(object);

    try {
      const response = await axios.post('/api/completion', object);
      alert("Great Shot!");
      setResult(response.data.text);
    } catch (error) {
      console.error(error);
      setResult('Something went wrong');
    }
  };

  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} />
      )}
    </div>
  );
}

export default App;