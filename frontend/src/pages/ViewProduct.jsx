import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import to get productId from URL
import Loading from '../Components/Loading';

export default function ViewProduct() {
    const { productId } = useParams(); // Get the productId from the route
    const url = import.meta.env.VITE_API_URL;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const handleNavUpdate = (id) => {
        navigate(`/update/${id}`); // Navigate to /view/:id
    };

    async function handleDelete(productId) {
        try {
            setIsLoading(true)
            await axios.delete(`${url}/product/${productId}`);
            console.log("Product deleted successfully");
            setIsLoading(false)
            navigate("/")

            // Optionally, refetch the updated product list or navigate the user away
        } catch (error) {
            console.error('Error deleting the product:', error);
        }
    }

    // Fetch product data from the API
    async function fetchData() {
        try {
            const res = await axios.get(`${url}/product/${productId}`);
            setData(res.data);
         
            setIsLoading(false)

        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [productId]); // Add productId as a dependency to re-fetch if it changes

    return (isLoading ?
        <div className="text-center mt-5">
            <Loading />
        </div>
        :
        <div className="container-sm bg-light mt-5 p-2">
            <div className="row">
                <div className="col-6">
                    <div className="p-5">
                        <img className='img-fluid' src={data.productImageUrl} alt={data.productName} />
                    </div>
                    <div className="d-flex m-2">
                        <div className="btn btn-primary m-1">
                            Buy Now
                        </div>
                        <div className="btn btn-warning m-1">
                            Add To Cart
                        </div>
                        <div onClick={() => handleNavUpdate(data.productId)} className="btn btn-success m-1">
                            Update
                        </div>
                        <div onClick={() => handleDelete(data.productId)} className="btn btn-danger m-1">
                            Delete
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <p className='display-3 text-center'>{data.productName}</p>
                    <div className="text-dark">
                        <p className='h3'> <span className="text-muted">
                            Product Id:
                        </span> {data.productId}</p>
                        <p className='h3'><span className="text-muted">
                            Product Description:
                        </span>  {data.productDescription}</p>
                        <p className='h3'> <span className="text-muted">
                            Available Count:
                        </span> {data.productStockCount}</p>
                        <p className='h3'> <span className="text-muted">
                            Price:
                        </span> {data.productPrice}$</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
