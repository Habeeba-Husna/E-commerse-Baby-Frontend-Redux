import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  // Use useEffect to trigger navigation after the component has mounted
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]); // Re-run effect if isLoggedIn changes

  // If logged in, render the children components
  return isLoggedIn ? children : null; // Prevent rendering children immediately
};

export default AdminProtected;
