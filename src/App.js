import './assets/styles/App.css';
import React from 'react';
import Home from './pages/home';
import { 
  Routes, 
  Route 
} from "react-router-dom";
import CustomerForm from './pages/customerForm';
import EditCustomer from './pages/editCustomer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/add' element={<CustomerForm />}/>
      <Route path='/customer/:customerId' element={<EditCustomer />} />
    </Routes>
  );
}

export default App;
