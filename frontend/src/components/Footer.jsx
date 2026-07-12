import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      padding: '60px 5% 30px',
      background: '#fff',
      borderTop: '1px solid #dfe6e9',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <h3 style={{ color: '#72BF78', marginBottom: '20px', fontSize: '1.5rem' }}>GroceryFresh</h3>
          <p style={{ color: '#636e72', lineHeight: '1.6', marginBottom: '20px' }}>
            The easiest way to get your groceries delivered to your home. Quality products at the best prices.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Facebook size={20} color="#636e72" style={{ cursor: 'pointer' }} />
            <Instagram size={20} color="#636e72" style={{ cursor: 'pointer' }} />
            <Twitter size={20} color="#636e72" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#636e72' }}>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>Home</li>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>About Us</li>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>Contact</li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#636e72' }}>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>FAQ</li>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>Shipping</li>
            <li style={{ marginBottom: '12px', cursor: 'pointer' }}>Returns</li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#636e72' }}>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="#72BF78" /> 123 Fresh St, Dhaka
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} color="#72BF78" /> +880 123 456 789
            </li>
            <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="#72BF78" /> support@fresh.com
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid #dfe6e9',
        color: '#b2bec3',
        fontSize: '0.9rem'
      }}>
        &copy; {new Date().getFullYear()} GroceryFresh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
