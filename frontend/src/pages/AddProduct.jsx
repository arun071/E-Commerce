import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export default function AddProduct() {
    // const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImageUrl: '',
        productStockCount: '',
        productAvailability: true,
    });
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState('');
    const url = import.meta.env.VITE_API_URL;

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

    // Create new item
    const handleCreate = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Check if any field in formData is empty
        if (Object.values(formData).some(value => value === '')) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        try {
            await axios.post(`${url}/product`, formData);
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
            // fetchData();
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <>
            <div className="container-sm p-5 rounded mt-4 bg-white">
                <div className="h1 text-center m-3">Add a New Product</div>
                <form onSubmit={handleCreate}>
                    <div className="form-group mb-3">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            id="productName"
                            name="productName"
                            className="form-control"
                            type="text"
                            placeholder="Enter Product Name"
                            value={formData.productName}
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
                            value={formData.productDescription}
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
                            value={formData.productPrice}
                            onChange={onChange}
                        />
                    </div>

                    {/* <div className="form-group mb-3">
                        <label htmlFor="productImageUrl">Product Image URL</label>
                        <input
                            id="productImageUrl"
                            name="productImageUrl"
                            className="form-control"
                            type="text"
                            placeholder="Enter Product Image URL"
                            value={formData.productImageUrl}
                            onChange={onChange}
                        />
                    </div> */}

                    <div className="form-group mb-3">
                        <label htmlFor="productStockCount">Stock Count</label>
                        <input
                            id="productStockCount"
                            name="productStockCount"
                            className="form-control"
                            type="number"
                            placeholder="Enter Product Stock Count"
                            value={formData.productStockCount}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="productAvailability">Availability</label>
                        <select
                            id="productAvailability"
                            name="productAvailability"
                            className="form-control"
                            value={formData.productAvailability}
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

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}
