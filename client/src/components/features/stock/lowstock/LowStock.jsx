import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../../../pages/config/config';
import axios from 'axios';

const LowStock = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/products`);
                // Calculate availableQty as in StockAdujestment, then filter for availableQty <= quantityAlert
                const allProducts = res.data.products || res.data || [];
                const lowStockProducts = allProducts
                    .map(p => {
                        let availableQty = 0;
                        if (typeof p.availableQty === 'number') {
                            availableQty = p.availableQty;
                        } else {
                            const quantity = Number(p.quantity ?? 0);
                            let newQuantitySum = 0;
                            if (Array.isArray(p.newQuantity)) {
                                newQuantitySum = p.newQuantity.reduce((acc, n) => {
                                    const num = Number(n);
                                    return acc + (isNaN(num) ? 0 : num);
                                }, 0);
                            } else if (typeof p.newQuantity === 'number') {
                                newQuantitySum = Number(p.newQuantity);
                            }
                            availableQty = quantity + newQuantitySum;
                        }
                        return { ...p, availableQty };
                    })
                    .filter(p => typeof p.quantityAlert === 'number' && p.availableQty === p.quantityAlert);
                setProducts(lowStockProducts);
                // Show toast for each low stock product
                lowStockProducts.forEach(product => {
                    toast.warn(`Low Stock: ${product.productName || product.name || 'N/A'} (Available: ${product.availableQty})`, {
                        position: 'top-right',
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
            } catch (err) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h4>Low Stock Products (≤ 10 Qty)</h4>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Available Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product.productName || product.name || 'N/A'}</td>
                                        <td>{product.productCode || product.itemBarcode || 'N/A'}</td>
                                        <td>{product.availableQty}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted">No low stock products.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LowStock;
