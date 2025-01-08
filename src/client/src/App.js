import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
import ChuaDetail from './pages/ChuaDetail';
import Quantri from './components/AdminDashboard';
import Contact from './pages/Contact';
import About from './pages/About'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <HelmetProvider>
      <Header />
      <Banner/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quantri" element={<Quantri />} />
        <Route path="Lienhe" element={<Contact />} />
        <Route path="Gioithieu" element={<About />} />
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/dangky" element={<Register />} />
        <Route path="/chua/:id" element={<ChuaDetail />} />
      </Routes>
      <Footer/>
    </HelmetProvider>  
  );
};

export default App;
