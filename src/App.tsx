import { useEffect, useRef, useState } from 'react'
import ProductList from './components/ProductList';
import ItemList from './components/ItemList'
function App() {
  const inpRef=useRef<HTMLInputElement>(null)
  const [product,setProducts]=useState<string>('')

  return (
    <div>
      <input ref={inpRef} type="text" className='form-control mt-5'/>
      <ProductList produc={product}/>
      <select onChange={(event)=>{setProducts(event.target.value)}}  className='form-select'>
        <option value="a"></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ItemList produc={product}/>
    </div>
   
  )
}

export default App
