import React, { useState } from 'react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;

    // Check if the category already exists
    if (categories.includes(newCategory)) {
      alert('Category already exists!');
      return;
    }

    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Available Categories:</h3>
        <table className="w-full">
          <tbody>
            {categories.map((category) => (
              <tr key={category} className="border-b">
                <td className="py-2">{category}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="text-red-500"
                  >
                    <svg
                      className="w-5 h-5 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center">
        <h3 className="text-xl font-bold mr-2">Add New Category:</h3>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 w-60"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ManageCategories;
