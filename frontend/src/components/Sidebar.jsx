import React from 'react';
import {
  ShoppingBasket,
  Apple,
  Droplets,
  Cookie,
  Coffee,
  Beef,
  Fish,
  IceCream,
  Baby,
  Dog,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const categories = [
    { name: 'Vegetables', icon: ShoppingBasket, color: '#72BF78' },
    { name: 'Fruits', icon: Apple, color: '#ff7675' },
    { name: 'Meat', icon: Beef, color: '#e17055' },
    { name: 'Fish', icon: Fish, color: '#0984e3' },
    { name: 'Dairy & Eggs', icon: Droplets, color: '#74b9ff' },
    { name: 'Bakery', icon: Cookie, color: '#fdcb6e' },
    { name: 'Frozen & Canned', icon: IceCream, color: '#a29bfe' },
    { name: 'Beverages', icon: Coffee, color: '#6c5ce7' },
    { name: 'Snacks', icon: Sparkles, color: '#fab1a0' },
    { name: 'Baby Care', icon: Baby, color: '#fd79a8' },
    { name: 'Pet Care', icon: Dog, color: '#b2bec3' },
  ];

  return (
    <aside className="chaldal-sidebar">
      <div className="sidebar-header">
        <h3>Categories</h3>
      </div>
      <div className="sidebar-menu">
        {categories.map((cat, index) => (
          <div key={index} className="menu-item">
            <cat.icon size={20} color={cat.color} strokeWidth={2} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
