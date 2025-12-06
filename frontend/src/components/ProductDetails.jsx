import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import EnquiryForm from './EnquiryForm';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showEnquiry, setShowEnquiry] = useState(false);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Error fetching product details:', err));
    }, [id]);

    if (!product) return <div className="text-center py-20 text-gray-500">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition">
                <span className="mr-2">←</span> Back to Products
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-auto rounded-lg object-cover shadow-sm"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="mb-4">
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-3xl font-bold text-green-600 mb-6">${product.price}</p>

                    <div className="prose prose-blue text-gray-600 mb-8">
                        <p>{product.long_desc}</p>
                    </div>

                    <div className="mt-auto">
                        <button
                            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors transform hover:-translate-y-0.5"
                            onClick={() => setShowEnquiry(true)}
                        >
                            Enquire Now
                        </button>
                    </div>
                </div>
            </div>

            {showEnquiry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-fade-in">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={() => setShowEnquiry(false)}
                        >
                            ×
                        </button>
                        <div className="p-8">
                            <EnquiryForm product={product} onClose={() => setShowEnquiry(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
