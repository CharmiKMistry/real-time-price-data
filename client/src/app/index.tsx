import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchPrices } from '../../slices/priceSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const prices = useSelector((state: any) => state.prices.prices);
  const loading = useSelector((state: any) => state.prices.loading);

  useEffect(() => {
    dispatch(fetchPrices());
    const interval = setInterval(() => {
      dispatch(fetchPrices());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h1>Real-Time Price Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price: any) => (
              <tr key={price._id}>
                <td>{price.symbol}</td>
                <td>{price.price}</td>
                <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
