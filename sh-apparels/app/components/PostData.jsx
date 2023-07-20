'use client'
import React, { useState } from 'react';
import axios from 'axios';

const PostData = () => {
  const [data, setData] = useState({
    name: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the API
      const response = await axios.post('/api/product', data);

      if (response.data.success) {
        console.log('Data inserted successfully:', response.data);
        // Do something with the successful response
      }
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostData;
