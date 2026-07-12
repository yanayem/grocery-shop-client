export const categories = [
  {
    id: 'food',
    name: 'Food',
    color: '#72BF78',
    subCategories: [
      {
        id: 'fruits-vegetables',
        name: 'Fruits & Vegetables',
        subSubCategories: [
          { id: 'fresh-vegetables', name: 'Fresh Vegetables' },
          { id: 'fresh-fruits', name: 'Fresh Fruits' }
        ]
      },
      {
        id: 'meat-fish',
        name: 'Meat & Fish',
        subSubCategories: [
          { id: 'meat', name: 'Meat' },
          { id: 'fish', name: 'Fish' }
        ]
      },
      {
        id: 'dairy-eggs',
        name: 'Dairy & Eggs',
        subSubCategories: [
          { id: 'eggs', name: 'Eggs' },
          { id: 'milk', name: 'Milk' },
          { id: 'dairy-products', name: 'Other Dairy' }
        ]
      }
    ]
  },
  {
    id: 'cleaning-household',
    name: 'Cleaning & Household',
    color: '#ff7675',
    subCategories: [
      {
        id: 'dishwashing',
        name: 'Dishwashing',
        subSubCategories: [
          { id: 'dish-soap', name: 'Dish Soap' },
          { id: 'scourers', name: 'Scourers' }
        ]
      }
    ]
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    color: '#0984e3',
    subCategories: [
      {
        id: 'bath-body',
        name: 'Bath & Body',
        subSubCategories: [
          { id: 'soaps', name: 'Soaps' },
          { id: 'shampoo', name: 'Shampoo' }
        ]
      }
    ]
  }
];

export const products = [
  // Vegetables
  { id: 1, name: 'Deshi Roma Tomatoes', price: 60, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/fb6e5b4b74e6443c94d075d9e5d4d3f3.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-vegetables', discount: 10 },
  { id: 2, name: 'Shatkhira-r Green Cucumber', price: 40, unit: '500 g', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/a4a8d43d1a8449c09a8f17a94f0e7d56.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-vegetables' },
  { id: 3, name: 'Pabna-r Red Onion', price: 85, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/9c8b7a6e5d4c3b2a1a0987654321fedc.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-vegetables' },
  { id: 4, name: 'Organic Broccoli', price: 120, unit: '1 pc', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/f39c1f6b1e2a4a9b8e8a7f6d5c4b3a21.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-vegetables' },

  // Fruits
  { id: 6, name: 'Rajshahi-r Fazli Mango', price: 150, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/fb6e5b4b74e6443c94d075d9e5d4d3f3.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-fruits' },
  { id: 7, name: 'Imported Green Apple', price: 280, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/a4a8d43d1a8449c09a8f17a94f0e7d56.jpg', category: 'food', subCategory: 'fruits-vegetables', subSubCategory: 'fresh-fruits' },

  // Meat
  { id: 9, name: 'Beef Bone-in (Fresh)', price: 750, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/f39c1f6b1e2a4a9b8e8a7f6d5c4b3a21.jpg', category: 'food', subCategory: 'meat-fish', subSubCategory: 'meat' },
  { id: 10, name: 'Chicken Whole', price: 190, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/9c8b7a6e5d4c3b2a1a0987654321fedc.jpg', category: 'food', subCategory: 'meat-fish', subSubCategory: 'meat' },

  // Fish
  { id: 22, name: 'Hilsa Fish (Ilish)', price: 1600, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/f39c1f6b1e2a4a9b8e8a7f6d5c4b3a21.jpg', category: 'food', subCategory: 'meat-fish', subSubCategory: 'fish' },

  // Eggs
  { id: 11, name: 'Farm Fresh Brown Eggs', price: 145, unit: '12 pcs', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/7d3a7b6b4e6d4c1b9b1a1a1a1a1a1a1a.jpg', category: 'food', subCategory: 'dairy-eggs', subSubCategory: 'eggs' },

  // Household
  { id: 26, name: 'Vim Dishwash Liquid', price: 110, unit: '500 ml', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/a4a8d43d1a8449c09a8f17a94f0e7d56.jpg', category: 'cleaning-household', subCategory: 'dishwashing', subSubCategory: 'dish-soap' },
];
