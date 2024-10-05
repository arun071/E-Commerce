import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

export default function Home() {
    const url = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Function to handle navigation to the product view page
    const handleNavUpdate = (id) => {
        navigate(`/view/${id}`); // Navigate to /view/:id
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch products data from the API
    async function fetchData() {
        try {
            const res = await axios.get(`${url}/products`);
            setData(res.data);
            setIsLoading(false);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false); // In case of error, stop loading spinner
        }
    }

    return (
        isLoading ? (
            <div className="text-center mt-5">
                <Loading />
            </div>
        ) : (
            <>
                <NavBar />
                <div className="container-fluid d-flex flex-wrap">
                    {data.map((item, index) => (
                        <div key={index} className="m-2">
                            <ProductCard
                                productId={item.productId}
                                productImageUrl={item.productImageUrl}
                                productStockCount={item.productStockCount}
                                productDescription={item.productDescription}
                                productName={item.productName}
                                productPrice={item.productPrice}
                                onProductClick={() => handleNavUpdate(item.productId)}
                            />
                        </div>
                    ))}
                </div>
            </>
        )
    );
}
