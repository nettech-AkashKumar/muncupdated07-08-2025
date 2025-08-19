import axios from 'axios';
import BASE_URL from '../pages/config/config';

export const getTotalStockValue = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/products/stock`);
    const totalValue = res.data.reduce((acc, product) => {
      return acc + (Number(product.stockValue) || 0);
    }, 0);
    return totalValue;
  } catch (err) {
    return 0;
  }
};
