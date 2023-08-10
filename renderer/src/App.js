import { useState } from 'react';

import './App.css';

function App() {
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

  async function onClickLoadImageButton() {
    const params = {
      param1: 'param1',
      param2: 'param2'
    }

    window.electron.invoke('load-image', params)
    .then((res) => {
      setParam1(res.param1);
      setParam2(res.param2);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ onClickLoadImageButton }>Load Image</button>
        <h1>{ param1 }</h1>
        <h1>{ param2 }</h1>
      </header>
    </div>
  );
}

export default App;
