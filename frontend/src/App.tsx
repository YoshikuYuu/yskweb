import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Define a TypeScript interface for your backend message
interface BackendMessage {
  text: string;
}

function App() {
  // Use the interface to type your state
  const [backendMessage, setBackendMessage] = useState<string>(''); // Or useState<BackendMessage | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: BackendMessage) => { // Type the incoming data
        setBackendMessage(data.text);
      })
      .catch(error => {
        console.error('Error fetching from backend:', error);
        setBackendMessage('Error connecting to backend.');
      });
  }, []);

  const [count, setCount] = useState<number>(0); // Example with number type

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Go (TypeScript)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Go Backend Message: {backendMessage}
      </p>
    </>
  );
}

export default App;