import { useState } from 'react'
import './App.css'
import RegistrationForm from './Pages/RegistrationForm';
import LoginForm from './Pages/LoginForm';

function App() {

  return (
    <div className='App'>
      <RegistrationForm/>
      <LoginForm/>
    </div>
  );
}

export default App;
