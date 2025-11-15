import React from 'react'
import OrderFilter from './OrderFilter'
import OrderTable from './OrderTable'
import { useState } from 'react';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      
      <h1 className="text-2xl lg:text-3xl font-semibold">Order Lists</h1>

      <div className="mt-5 flex-1 overflow-y-auto space-y-5">
        
        <div>
          <OrderFilter setOrderList={setOrderList} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <OrderTable
            orderList={orderList}
            setOrderList={setOrderList}
          />
        </div>

      </div>

    </div>
  );
};


export default OrderList
