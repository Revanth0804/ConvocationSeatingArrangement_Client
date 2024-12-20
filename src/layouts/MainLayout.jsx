import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';
import Header1 from '../components/Header1';  

function MainLayout({ children, isLoggedIn, isAdminLoggedIn, onLogout }) {
  return (
    <>
      {!isLoggedIn ? (<Header1 />) 
        : isAdminLoggedIn ? (<AdminHeader onLogout={onLogout} /> ) 
        : ( <Header onLogout={onLogout} /> )
      }
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
