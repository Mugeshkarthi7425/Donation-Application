import React from 'react'
import { useEffect, useState } from "react";
const Fetchapi = () => {
const [products, setProducts] = useState([]);
 
  const fetchData = () => {
    fetch("https://reqres.in/api/products")
      .then((res) => res.json())
      .then(({data}) => setProducts(data));
  };
 
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
 <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
            <th>Pantone Value</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.year}</td>
              <td>{product.pantone_value}</td>
            </tr>
           ))}
        </tbody>
      </table>



    </div>
  )
}

export default Fetchapi