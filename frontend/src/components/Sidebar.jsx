import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '../data/products';

const Sidebar = () => {
  const navigate = useNavigate();
  const [openCats, setOpenCats] = useState({});
  const [openSubCats, setOpenSubCats] = useState({});

  const toggleCat = (id) => {
    setOpenCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubCat = (id) => {
    setOpenSubCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNav = (type, id) => {
    navigate(`/category/${type}/${id}`);
  };

  // Map category IDs to their specific multi-color theme
  const getColor = (id) => {
    const colors = {
      'food': '#237227',
      'cleaning-household': '#3b82f6',
      'personal-care': '#ec4899',
    };
    return colors[id] || '#237227';
  };

  return (
    <aside className="hidden lg:block w-[240px] h-[calc(100vh-65px)] bg-white border-r border-gray-200 fixed top-[65px] left-0 overflow-y-auto z-[900] text-left scrollbar-hide">
      <div className="px-6 py-5 border-b border-gray-50">
        <h3 className="text-[0.9rem] text-gray-500 uppercase tracking-wider font-bold">Categories</h3>
      </div>
      <div className="py-2.5">
        {categories.map((cat) => (
          <div key={cat.id} className="mb-1">
            <div
              className={`flex items-center justify-between px-6 py-3 cursor-pointer text-[0.95rem] transition-all duration-200 border-l-4 ${openCats[cat.id] ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-800 font-bold'} hover:bg-green-50`}
              onClick={() => toggleCat(cat.id)}
            >
              <span className="flex-1">{cat.name}</span>
              {cat.subCategories && (
                openCats[cat.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </div>

            {openCats[cat.id] && cat.subCategories && (
              <div className="bg-gray-50/30">
                {cat.subCategories.map((sub) => (
                  <div key={sub.id} className="mb-0.5">
                    <div
                      className={`flex items-center justify-between pl-10 pr-6 py-2.5 cursor-pointer text-[0.9rem] font-semibold transition-all duration-200 ${openSubCats[sub.id] ? 'text-primary' : 'text-gray-500'} hover:text-primary`}
                      onClick={() => toggleSubCat(sub.id)}
                    >
                      <span className="flex-1" onClick={(e) => { e.stopPropagation(); handleNav('subcategory', sub.id); }}>{sub.name}</span>
                      {sub.subSubCategories && (
                        openSubCats[sub.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                      )}
                    </div>

                    {openSubCats[sub.id] && sub.subSubCategories && (
                      <div className="bg-gray-100/50">
                        {sub.subSubCategories.map((ssub) => (
                          <div
                            key={ssub.id}
                            className="pl-[55px] pr-6 py-2 cursor-pointer text-[0.85rem] text-gray-500 hover:text-primary transition-all duration-200"
                            onClick={() => handleNav('subsubcategory', ssub.id)}
                          >
                            {ssub.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
