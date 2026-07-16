import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // These keep track of which menu items are clicked/open
  const [openMainMenus, setOpenMainMenus] = useState({});
  const [openSubMenus, setOpenSubMenus] = useState({});

  // When the sidebar first loads, get categories from the server
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        const data = await response.json();

        // Organize the flat data into a Parent -> Child list
        const categoryTree = organizeAsTree(data);
        setCategories(categoryTree);
      } catch (error) {
        console.error('Could not load categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Helper function to arrange categories inside their parents
  const organizeAsTree = (list) => {
    const itemMap = {};
    const finalTree = [];

    // Map every item by its ID
    list.forEach(item => {
      const id = item.id || item._id;
      itemMap[id] = { ...item, id, subCategories: [] };
    });

    // Link children to parents
    list.forEach(item => {
      const id = item.id || item._id;
      const parentId = typeof item.parent_id === 'object' ? item.parent_id?.$oid : item.parent_id;

      if (parentId && itemMap[parentId]) {
        itemMap[parentId].subCategories.push(itemMap[id]);
      } else if (item.level === 0 || !parentId) {
        // Top level categories
        finalTree.push(itemMap[id]);
      }
    });

    return finalTree;
  };

  // Open or close a main category
  const toggleMainMenu = (id) => {
    setOpenMainMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Open or close a sub category
  const toggleSubMenu = (id) => {
    setOpenSubMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Go to the category page
  const goToCategory = (type, id) => {
    navigate(`/category/${type}/${id}`);
  };

  return (
    <aside className="hidden lg:block w-[240px] h-[calc(100vh-65px)] bg-white border-r border-gray-200 fixed top-[65px] left-0 overflow-y-auto z-[900] text-left scrollbar-hide">
      <div className="px-6 py-5 border-b border-gray-50">
        <h3 className="text-[0.9rem] text-gray-500 uppercase tracking-wider font-bold">Categories</h3>
      </div>
      <div className="py-2.5">
        {/* Show loading text if data is not ready yet */}
        {categories.length === 0 && (
          <div className="px-6 py-4 text-sm text-gray-400 font-medium">Loading items...</div>
        )}

        {/* Loop through each category */}
        {categories.map((cat) => (
          <div key={cat.id} className="mb-1">
            <div
              className={`flex items-center justify-between px-6 py-3 cursor-pointer text-[0.95rem] transition-all duration-200 border-l-4 ${openMainMenus[cat.id] ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-800 font-bold'} hover:bg-green-50`}
              onClick={() => toggleMainMenu(cat.id)}
            >
              <span className="flex-1">{cat.name}</span>
              {cat.subCategories && cat.subCategories.length > 0 && (
                openMainMenus[cat.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </div>

            {/* Sub-categories */}
            {openMainMenus[cat.id] && cat.subCategories && cat.subCategories.length > 0 && (
              <div className="bg-gray-50/30">
                {cat.subCategories.map((sub) => (
                  <div key={sub.id} className="mb-0.5">
                    <div
                      className={`flex items-center justify-between pl-10 pr-6 py-2.5 cursor-pointer text-[0.9rem] font-semibold transition-all duration-200 ${openSubMenus[sub.id] ? 'text-primary' : 'text-gray-500'} hover:text-primary`}
                      onClick={() => toggleSubMenu(sub.id)}
                    >
                      <span className="flex-1" onClick={(e) => { e.stopPropagation(); goToCategory('subcategory', sub.id); }}>{sub.name}</span>
                      {sub.subCategories && sub.subCategories.length > 0 && (
                        openSubMenus[sub.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                      )}
                    </div>

                    {/* Sub-Sub-categories */}
                    {openSubMenus[sub.id] && sub.subCategories && sub.subCategories.length > 0 && (
                      <div className="bg-gray-100/50">
                        {sub.subCategories.map((ssub) => (
                          <div
                            key={ssub.id}
                            className="pl-[55px] pr-6 py-2 cursor-pointer text-[0.85rem] text-gray-500 hover:text-primary transition-all duration-200"
                            onClick={() => goToCategory('subsubcategory', ssub.id)}
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
