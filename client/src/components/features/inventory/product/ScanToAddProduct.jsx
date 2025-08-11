import React, { useEffect, useState } from 'react'
import {BrowserMultiFormatReader, NotFoundException} from "@zxing/library"
import axios from 'axios'
import BASE_URL from '../../../../pages/config/config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ScanToAddProduct = () => {
    const [scannedCode, setScannedCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        codeReader.listVideoInputDevices().then(videoInputDevices => {
            codeReader.decodeFromVideoDevice(
                videoInputDevices[0]?.deviceId,
                'video',
                (result, err) => {
                    if (result) {
                        setScannedCode(result.getText());
                        codeReader.reset();
                    }
                    if (err && !(err instanceof NotFoundException)) {
                        console.error(err);
                    }
                }
            )
        })
            .catch((err) => console.error(err))
    }, []);
    useEffect(() => {
        if (scannedCode) {
            axios.post(`${BASE_URL}/api/products/scan`, { code: scannedCode }).then((res) => {
                setProduct(res.data.product);
                toast.success('Product found and added!')
            }).catch((err) => {
                setError('Product not found');
                toast.error('Product not found')
            })
        }
    }, [scannedCode]);
    return (
        <div style={{textAlign:'center', marginTop:'100px'}}>
        <h2>Scan Product</h2>
            <video id='video' width="400" height="300" style={{ border: '1px solid black' }}></video>
            {product && (
                <div>
                    <h4>Scanned Product:</h4>
                    <p>Name:{product.name}</p>
                    <p>Code:{product.productCode}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}

export default ScanToAddProduct
