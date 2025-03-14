import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './redux/store'; // Import the Redux store

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap the app with Provider and pass the store */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);