import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 My Website. All Rights Reserved.</p>
    </footer>
  );
};
 
const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px 20px',
};

export default Footer;
