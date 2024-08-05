import React from 'react';
import { Link } from 'react-router-dom';

const PasswordResetConfirmation = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Password Reset</h2>
      <p style={styles.message}>A link to update your password has been sent to your email.</p>
      <Link to="/login" style={styles.link}>Go to Login</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily:'sans-serif',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#121212', 
    color: '#FFFFFF', 
    padding: '20px',
  },
  heading: {
    color: '#BB86FC', 
  },
  message: {
    color: '#E0E0E0', 
  },
  link: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#BB86FC',
  },
};

export default PasswordResetConfirmation;
