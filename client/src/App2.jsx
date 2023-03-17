import './App.css';
import OptionSelection from './components/OptionSelection';
import { arrayItems } from './AIOption';
import Translation from './components/Translation';
import { useState } from 'react';
import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";

function App() {
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});  
  const [response, setResponse] = useState("");

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async (e) => {
    e.preventDefault();
    let object = { ...option, prompt: input };
    const response = await openai.createCompletion(object);
    setResult(response.data.choices[0].text);
    // console.log(object);
    // axios
    //   .post('http://localhost:5173/chat', object)
    //   .then((res) => {
    //     setResult(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
      
    //let object = { ...option, prompt: input };
    //const response = await openai.createCompletion(object);
    //setResult(response.data.choices[0].text);
  };

  const handleSubmit = async (e) => {
    console.log("activating doStuff")
    e.preventDefault();
    axios
      .post('http://localhost:5173/chat', {input})
      // after that it will get the response and display it
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(input);

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