// src/components/PriceTable.tsx
import React from 'react';

interface Price {
  _id: string;
  symbol: string;
  price: number;
  timestamp: string;
}

interface PriceTableProps {
  prices: Price[];
}

const PriceTable: React.FC<PriceTableProps> = ({ prices }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price) => (
          <tr key={price._id}>
            <td>{price.symbol}</td>
            <td>{price.price}</td>
            <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
