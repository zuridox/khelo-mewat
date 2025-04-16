// src/App.js
import React from 'react';

const Bug = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Error"
          style={styles.image}
        />
        <h1 style={styles.title}>Something Went Wrong</h1>
        <p style={styles.message}>
          An unexpected error occurred. Please try again later or contact the Khelo Mewat team for help.
        </p>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Reload App
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '380px',
  },
  image: {
    width: '80px',
    height: '80px',
    marginBottom: '20px',
    opacity: 0.9,
  },
  title: {
    fontSize: '1.8rem',
    color: '#d32f2f',
    marginBottom: '12px',
  },
  message: {
    fontSize: '1rem',
    color: '#444',
    marginBottom: '25px',
    lineHeight: '1.5',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#1976d2',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Bug;
