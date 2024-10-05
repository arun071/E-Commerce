import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'
import ViewProduct from './pages/ViewProduct.jsx'
import UpdateProduct from './pages/UpdateProduct.jsx'

export default function App() {
    return (
        <BrowserRouter>
                <Routes>
                <Route path='/' element={<Home/>} />
                <Route path="/view/:productId" element={<ViewProduct/>} />
                <Route path="/update/:productId" element={<UpdateProduct />} />
                <Route path='/add-product' element={<AddProduct/>} />
                <Route path='*' element={<PageNotFound/>} />
                </Routes>
        </BrowserRouter>
    )
}
