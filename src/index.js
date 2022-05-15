import React from 'react';
import ReactDOM from 'react-dom/client';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from 'components/App';
import { GlobalStyle } from 'components/GlobalStyle';
import { Global } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Global styles={GlobalStyle} />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
