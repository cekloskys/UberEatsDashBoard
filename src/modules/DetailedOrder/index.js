import { Card, Descriptions, Divider, List, Button, Tag, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order, User, OrderDish, Dish, OrderStatus } from '../../models';

const statusToColor = {
  NEW: 'green',
  COOKING: 'orange',
  READY_FOR_PICKUP: 'red',
};

const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState(null);
  const [orderDishes, setOrderDishes] = useState([]);
  const [finalOrderDishes, setFinalOrderDishes] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Order, id).then(setOrder);
  }, [id]);

  useEffect(() => {
    if (order?.userID) {
      DataStore.query(User, order.userID).then(setCustomer);
    }
  }, [order?.userID]);

  useEffect(() => {
    if (!order?.id) {
      return;
    }
    DataStore.query(OrderDish, (od) => od.orderID.eq(order.id)).then(setOrderDishes);
  }, [order?.id]);

  useEffect(() => {
    if (!orderDishes) {
      return;
    }
    // query all dishes
    const fetchDishes = async () => {
      const dishes = await DataStore.query(Dish);
      console.log(dishes);
      // assign the products to the cart items
      setFinalOrderDishes(
        orderDishes.map(orderDish => ({
          ...orderDish,
          Dish: dishes.find(d => d.id === orderDish.orderDishDishId),
        }))
      );
    };
    fetchDishes();
  }, [orderDishes]);

  const acceptOrder = async () => {
    const updatedOrder = await DataStore.save(Order.copyOf(order, updated =>{
      updated.status = OrderStatus.COOKING;
    }));
    setOrder(updatedOrder);
  };

  const declineOrder = async () => {
    const updatedOrder = await DataStore.save(Order.copyOf(order, updated =>{
      updated.status = OrderStatus.DECLINED_BY_RESTAURANT;
    }));
    setOrder(updatedOrder);
  };

  const readyForPickUp = async () => {
    const updatedOrder = await DataStore.save(Order.copyOf(order, updated =>{
      updated.status = OrderStatus.READY_FOR_PICKUP;
    }));
    setOrder(updatedOrder);
  };

  if (!order) {
    return <Spin size='large' />
  }

  return (
    <Card title={`Order ${id}`} style={{ margin: 20, }}>
      <Divider />
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Order Status"><Tag color={statusToColor[order?.status]}>{order?.status}</Tag></Descriptions.Item>
        <Descriptions.Item label="Customer">{customer?.name}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">{customer?.address}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={finalOrderDishes}
        renderItem={(dish) => (
          <List.Item>
            <div style={{ fontWeight: 'bold' }}>{dish?.Dish?.name} x{dish?.quantity}</div>
            <div>${dish?.Dish?.price.toFixed(2)}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>${order.total && order.total.toFixed(2)}</h2>
      </div>
      <Divider />
      {order.status === OrderStatus.NEW && (
        <div style={styles.buttonsContainer}>
          <Button 
            block 
            danger 
            type='primary' 
            size='large' 
            style={styles.button}
            onClick={declineOrder}
          >
            Decline Order
          </Button>
          <Button 
            block 
            type='primary' 
            size='large' 
            style={styles.button}
            onClick={acceptOrder}
          >
            Accept Order
          </Button>
        </div>
      )}
      {order.status === OrderStatus.COOKING && (
        <Button 
          block 
          type='primary' 
          size='large' 
          style={styles.button}
          onClick={readyForPickUp}
        >
          Food Is Done
        </Button>
      )}
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  totalPrice: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    paddingBottom: 30,
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
  },
};

export default DetailedOrder;