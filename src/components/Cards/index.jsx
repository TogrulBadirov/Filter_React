import React, { useEffect, useState } from 'react'
import UseFetch from '../UseFetch'
import './index.scss'
const Cards = () => {
    const [data, setData] = useState()
    const [filteredData, setFilteredData] = useState()
    const [categories, setCategories] = useState()
    const handleData = (datas)=>{
        setData(datas)
        setFilteredData(datas)
    }
    const handleCategories = (datas)=>{
        setCategories(datas)
        
    }
    useEffect(() => {
        UseFetch("https://northwind.vercel.app/api/products",handleData)
        UseFetch("https://northwind.vercel.app/api/categories",handleCategories)


    }, [])
    
    const handleFilter = (e)=>{
        let filteredData= data.filter(x=>x.categoryId === parseInt(e.target.value))

        e.target.value === "all" ? setFilteredData(data):setFilteredData(filteredData)
    }
    const handleInput = (e)=>{
        setFilteredData(data.filter(x=>x.name.includes(e.target.value) ))
    }
    const handleSort = (e)=>{
       if (e.target.value === "0") {
        setFilteredData([...data].sort((a,b)=>(a.name > b.name? 1:b.name>a.name?-1:0)))
       }
       else{
        setFilteredData([...data].sort((b,a)=>(a.name > b.name? 1:b.name>a.name?-1:0)))
       }
    }

  return (
    <>
    <section id='cards'>
        <button value='all' onClick={handleFilter}>Show All</button>
        {categories && categories.map((x)=>{
         return(
            <button value={x.id} onClick={handleFilter}>{x.name}</button>   
         )
        })}
        {/* <button value={1} onClick={handleFilter}>Filter 1</button>
        <button value={2} onClick={handleFilter}>Filter 2</button> */}
        <button value={0} onClick={handleSort}>Sort A-Z</button>
        <button value={1} onClick={handleSort}>Sort Z-A</button>
        <input type="text" onChange={handleInput} />
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Price$</th>
                <th>Category</th>
            </tr>
        </thead>
        {filteredData && filteredData.map((item)=>{
            return(
                <>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.categoryId}</td>
                </tr>
                </>
            )
        })}
    </table>
    </section>
    </>
  )
}

export default Cards