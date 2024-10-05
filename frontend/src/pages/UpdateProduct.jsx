import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    const navigate = useNavigate();

    const { productId } = useParams(); // Get the productId from the route
    const [data, setData] = useState([]); // Holds fetched product data
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImageUrl: '',
        productStockCount: '',
        productAvailability: true,
    }); // Form state
    const [image, setImage] = useState(formData.productImageUrl);
    const [progress, setProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState('');
    const url = import.meta.env.VITE_API_URL;


    // Fetch product data on component load
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const res = await axios.get(`${url}/product/${productId}`); // Fetch product with ID 1
            setData(res.data);
            setFormData({
                productName: res.data.productName || '',
                productDescription: res.data.productDescription || '',
                productPrice: res.data.productPrice || '',
                productImageUrl: res.data.productImageUrl || '',
                productStockCount: res.data.productStockCount || '',
                productAvailability: res.data.productAvailability || true,
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            handleUpload(e.target.files[0]); // Automatically call handleUpload with the selected file
        }
    };

    const handleUpload = (image) => {
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progress function to show upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Error uploading file:', error);
            },
            () => {
                // Handle successful uploads and get download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setDownloadUrl(downloadURL);
                    setFormData((prevData) => ({ ...prevData, productImageUrl: downloadURL })); // Set the download URL in formData
                });
            }
        );
    };

    // Update product item
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Check if any field in formData is empty
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        try {
            await axios.put(`${url}/product/${productId}`, formData); // Use PUT for updates
            // Reset form if needed
            setFormData({
                productName: '',
                productDescription: '',
                productPrice: '',
                productImageUrl: '',
                productStockCount: '',
                productAvailability: true,
            });
            setProgress(0); // Reset progress
            setDownloadUrl(''); // Reset image URL
            setImage(null); // Reset image selection
            fetchData(); // Optionally refetch the updated product data
            navigate("/")
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <>
            <div className="container-sm p-5 rounded mt-4 bg-white">
                <div className="h1 text-center m-3">Update Product</div>
                <form onSubmit={handleUpdate}>
                    <div className="form-group mb-3">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            id="productName"
                            name="productName"
                            className="form-control"
                            type="text"
                            placeholder="Enter Product Name"
                            value={formData.productName} // Use formData for controlled input
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="productDescription">Product Description</label>
                        <input
                            id="productDescription"
                            name="productDescription"
                            className="form-control"
                            type="text"
                            placeholder="Enter Product Description"
                            value={formData.productDescription} // Use formData for controlled input
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="productPrice">Product Price (in Rs.)</label>
                        <input
                            id="productPrice"
                            name="productPrice"
                            className="form-control"
                            type="number"
                            placeholder="Enter Product Price"
                            value={formData.productPrice} // Use formData for controlled input
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="productStockCount">Stock Count</label>
                        <input
                            id="productStockCount"
                            name="productStockCount"
                            className="form-control"
                            type="number"
                            placeholder="Enter Product Stock Count"
                            value={formData.productStockCount} // Use formData for controlled input
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="productAvailability">Availability</label>
                        <select
                            id="productAvailability"
                            name="productAvailability"
                            className="form-control"
                            value={formData.productAvailability} // Use formData for controlled input
                            onChange={onChange}
                        >
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label>Image Upload: </label>
                        <input
                            className='form-control'
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div>
                            <progress value={progress} max="100" />
                            {progress > 0 && <span>{progress.toFixed(2)}% done</span>}
                        </div>
                        {downloadUrl && (
                            <div className='row'>
                                <div className='col-3 '>
                                    <img className='img-fluid' src={downloadUrl} alt="" />
                                </div>
                                <div className="col-9">
                                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                                        View Uploaded Image
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <button  type="submit" className="btn btn-success">Update</button>
                </form>
            </div>
        </>
    );
}
