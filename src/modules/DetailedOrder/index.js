import { Card, Descriptions, Divider, List, Button } from 'antd';
import dishes from '../../data/dashboard/dishes.json';
import { useParams } from 'react-router-dom';

const DetailedOrder = () => {
  const { id } = useParams();

  return (
    <Card title={`Order ${id}`} style={{ margin: 20, }}>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">Susan Cekloky</Descriptions.Item>
        <Descriptions.Item label="Customer Address">301 Woods Edge Drive</Descriptions.Item>
      </Descriptions>
      <Divider />
      <List
        dataSource={dishes}
        renderItem={(dish) => (
          <List.Item>
            <div style={{ fontWeight: 'bold' }}>{dish.name} x{dish.quantity}</div>
            <div>${dish.price}</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>$42.96</h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button block danger type='primary' size='large' style={styles.button}>
          Decline Order
        </Button>
        <Button block type='primary' size='large' style={styles.button}>
          Accept Order
        </Button>
      </div>
      <Button block type='primary' size='large' style={styles.button}>
        Food Is Done
      </Button>
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