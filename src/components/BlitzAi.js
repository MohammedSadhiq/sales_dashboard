import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarGraph from './BarGraph';
import { DataGrid } from '@mui/x-data-grid';
import { AppBar, Toolbar, Typography,Button  } from '@mui/material';

function BlitzAi() {
  const [data, setData] = useState([]);
  const [productSales, setProductSales] = useState({});

  useEffect(() => {
   fetchData();
  }, []);

  function fetchData(){
    axios.get('https://blob-internal.goblitz.ai/quickdump/sales-data').then((response) => {
        console.log('response', response.data);
        const updatedData = response.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setData(updatedData);
        const salesData = getProductsData(updatedData);
        console.log('sales', salesData);
        setProductSales(salesData);
      });
  }

  const columns = Object.keys(data[0] || {}).map((ele) => {
    return { field: ele, headerName: ele.toUpperCase(), width: 100 };
  });

  console.log('columns', columns);

  function getProductsData(data) {
    const items = data.reduce((acc, obj) => {
      const itemName = obj.PRODUCTLINE;
      if (!acc[itemName]) {
        acc[itemName] = 1;
      } else {
        acc[itemName]++;
      }
      return acc;
    }, {});
    console.log('items', items);
    return items;
  }

  console.log('product sales', productSales);

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">BlitzAI</Typography>
          <div style={{position:"relative",left:"70%"}} >
        <Button onClick={fetchData} color="error" variant="contained">Refresh</Button>
        </div>
        </Toolbar>
        
      </AppBar>
      <div style={{ display: 'flex' }}>
        {Object.keys(productSales).length > 0 && (
          <div style={{ width: '40%', marginRight: '20px' }}>
            <BarGraph data={productSales} />
          </div>
        )}
        {data.length > 0 && (
          <div style={{ width: '60%' }}>
            <p>Details</p>
            <DataGrid rows={data} pagination={true} columns={columns} pageSize={25} getRowId={(row) => row.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BlitzAi;
