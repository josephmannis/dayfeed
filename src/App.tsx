import React from 'react';
import logo from './logo.svg';
import './App.css';
import getNewsService from './service/news';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn ReactssSsss
          <Check/>
        </a>
      </header>
    </div>
  );
}

const Check: React.FC = () => {
  React.useEffect(() => {
    async function getSources() {
      let service = getNewsService()
      service.getSources().then(sources => console.log(sources))
    }
    getSources();
  }, [])
  return(<div>hi</div>)
}

export default App;
