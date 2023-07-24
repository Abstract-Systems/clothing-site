// DataContext.js
"use client"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                const data = await response.data;
                setData(data);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        };
    }, []);
    


  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
