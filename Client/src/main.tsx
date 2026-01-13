import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts'; // Changed to named import
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './assets/queryClient.ts';

// PAGES
import GigFeed from './components/pages/GigFeed.tsx';
import ProfilePage from './components/pages/ProfilePage.tsx';
import RegisterPage from './components/pages/RegisterPage.tsx';
import LoginPage from './components/pages/LoginPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App/>} >
              <Route index element={<GigFeed />}/> 
              <Route path='dashboard' element={<GigFeed />}/>
              <Route path='profile/:id' element={<ProfilePage />}/> 
            </Route>
            <Route path='register' element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);