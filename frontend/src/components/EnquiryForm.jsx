import React, { useState } from 'react';
import axios from 'axios';

function EnquiryForm({ product, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `I am interested in ${product.name}. Please contact me.`
    });
    const [status, setStatus] = useState(''); // success, error
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
        if (!formData.message) errs.message = 'Message is required';
        return errs;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        try {
            await axios.post('/api/enquiries', {
                product_id: product.id,
                ...formData
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-8">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-800">Enquiry Sent!</h3>
                <p className="text-gray-600 mt-2">We will get back to you soon.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enquire about <span className="text-primary">{product.name}</span></h2>
            {status === 'error' && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">Something went wrong. Please try again.</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
                    >
                        Send Enquiry
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EnquiryForm;
