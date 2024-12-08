import { useEffect, useState } from 'react';
import './App.css';
import Axios from './apis/@core';

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      const { data } = await Axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );

      setState(data);
    };

    fetchTest();
  }, []);

  console.log(state);

  return <>안녕</>;
}

export default App;
