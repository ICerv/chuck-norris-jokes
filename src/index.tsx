import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      {(bootstrapped) => {
        if (!bootstrapped) {
          return <div>Failed to rehydrate state. Please refresh.</div>;
        }
        return (
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        );
      }}
    </PersistGate>
  </Provider>,
);

reportWebVitals();
