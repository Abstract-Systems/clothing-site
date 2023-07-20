import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [activeOption, setActiveOption] = useState(1);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (parseInt(key) >= 1 && parseInt(key) <= 4) {
        setActiveOption(parseInt(key));
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-gray-800 text-white h-screen w-1/6 py-8 px-4 ">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li
          className={`mb-2 p-2 cursor-pointer ${
            activeOption === 1 ? 'bg-blue-600' : ''
          }`}
          onClick={() => setActiveOption(1)}
        >
          Add Product
        </li>
        <li
          className={`mb-2 p-2 cursor-pointer ${
            activeOption === 2 ? 'bg-blue-600' : ''
          }`}
          onClick={() => setActiveOption(2)}
        >
          Manage Categories
        </li>
        <li
          className={`mb-2 p-2 cursor-pointer ${
            activeOption === 3 ? 'bg-blue-600' : ''
          }`}
          onClick={() => setActiveOption(3)}
        >
          Manage Products
        </li>
        <li
          className={`mb-2 p-2 cursor-pointer ${
            activeOption === 4 ? 'bg-blue-600' : ''
          }`}
          onClick={() => setActiveOption(4)}
        >
          Orders
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
