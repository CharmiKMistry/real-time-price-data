import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrices } from "./slices/priceSlice";
import { RootState, AppDispatch } from "./store";
import PriceTable from "./components/PriceTable";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prices = useSelector((state: RootState) => state.prices.prices);
  const loading = useSelector((state: RootState) => state.prices.loading);

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
      {loading ? <p>Loading...</p> : <PriceTable prices={prices} />}
    </div>
  );
};

export default App;
