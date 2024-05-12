
import './App.css';
import BackgroundAnimation from './BackgroundAnimation';
import InputShorturl from './InputShorturl';
import LinkResult from './LinkResult';
import  { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
   <div className='container'>
   <InputShorturl setInputValue={setInputValue}/>
   <BackgroundAnimation/>
   <LinkResult inputValue={ inputValue}/>

   </div>
  );
}

export default App;
