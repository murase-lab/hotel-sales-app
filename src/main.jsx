import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import BreakfastPage from './pages/BreakfastPage';
import LunchPage from './pages/LunchPage';
import DinnerPage from './pages/DinnerPage';
import DinnerDrinkPage from './pages/DinnerDrinkPage';
import CafePage from './pages/CafePage';
import BentoPage from './pages/BentoPage';
import ExpensePage from './pages/ExpensePage';
import CashRegisterPage from './pages/CashRegisterPage';
import ConfirmationPage from './pages/ConfirmationPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breakfast" element={<BreakfastPage />} />
        <Route path="/lunch" element={<LunchPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        <Route path="/dinner-drink" element={<DinnerDrinkPage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/bento" element={<BentoPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/cash-register" element={<CashRegisterPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
