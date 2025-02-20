import { Routes, Route } from 'react-router-dom';
import ListOffer from '../pages/ListOffer';
import Home from '../pages/Home';
import Account from '../pages/Account';
import PrivateRoute from './PrivateRoute';
import MyOffers from '../pages/MyOffers';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/offers" element={<ListOffer />} />
      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
      <Route path="/my-offers" element={<PrivateRoute><MyOffers /></PrivateRoute>} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}