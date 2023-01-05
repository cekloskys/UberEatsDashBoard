import { useState, useEffect } from 'react';
import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Order } from '../../models';
import { useRestaurantContext } from '../../contexts/RestaurantContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {restaurant} = useRestaurantContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!restaurant){
            return;
        }
        DataStore.query(Order, (order) => 
            order.orderRestaurantId.eq(restaurant.id)).then(setOrders);
    }, [restaurant]);

    const renderOrderStatus = (orderStatus) => {
      
        const statusToColor = {
            NEW: 'green',
            COOKING: 'orange',
            READY_FOR_PICKUP: 'red',
        };

        return <Tag color={statusToColor[orderStatus]}>{orderStatus}</Tag>
    };

    const tableColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'total',
            render: (price) => `$ ${price.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderOrderStatus
        },
    ];

    return (
        <Card title={'Orders'} style={{ margin: 20, }}>
            <Table 
                dataSource={orders}
                columns={tableColumns}
                rowKey='id'
                onRow={(order) => ({
                    onClick: () => navigate(`order/${order.id}`)
                })}
            />
        </Card>
    );
};

export default Orders;