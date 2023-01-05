import { useEffect, useState } from "react";
import { Form, Card, Button, Input, message } from "antd";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";

const Settings = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const {sub, setRestaurant, restaurant} = useRestaurantContext();

    useEffect(() => {
        setName(restaurant.name);
        setAddress(restaurant.address);
        setImage(restaurant.image);
    }, [restaurant]);

    const onSubmit = async () => {
        if (!restaurant){
            await createNewRestaurant();
        } else {
            await updateRestaurant();
        }
    };

    const updateRestaurant = async () => {
        const updateRestaurant = await DataStore.save(
            Restaurant.copyOf(restaurant, (updated) => {
                updated.name = name;
                updated.address = address;
                updated.image = image;
            })
        );
        setRestaurant(updateRestaurant);
        message.success('Restaurant has been updated!');
    };

    const createNewRestaurant = async () => {
        const newRestaurant = DataStore.save(new Restaurant({
            name,
            image,
            address,
            deliveryFee: 0,
            minDeliveryTime: 15,
            maxDeliveryTime: 60,
            lat: 26,
            lng: 27,
            adminSub: sub,
        }));
        setRestaurant(newRestaurant);
        message.success('Restaurant has been created!');
    };

    return (
        <Card title='Restaurant Details' style={{margin: 20,}}>
            <Form layout='vertical'>
                <Form.Item label='Name' required>
                    <Input 
                        placeholder="Enter Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label='Address' required>
                    <Input 
                        placeholder="Enter Address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label='Image' required>
                    <Input 
                        placeholder="Enter Image Link" 
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit" onClick={onSubmit}>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;