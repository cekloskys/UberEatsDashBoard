import { useState } from "react";
import { Form, Input, Button, Card, InputNumber, message } from "antd";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const CreateMenuItem = () => {

    const navigate = useNavigate();

    const {restaurant} = useRestaurantContext();

    const onFinish = async ({name, description, price, image}) => {
        DataStore.save(new Dish({
            name,
            description,
            price,
            image,
            restaurantID: restaurant.id,
        }));
        message.success('Dish has been created.');
        navigate('/menu');
    };
    
    return (
        <Card title={'Create New Item'} style={{margin: 20,}}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label={'Name'} required name='name'>
                    <Input 
                        placeholder="Enter Name" 
                    />
                </Form.Item>
                <Form.Item label={'Description'} required name='description'>
                    <TextArea 
                        rows={4} 
                        placeholder="Enter Description" 
                    />
                </Form.Item>
                <Form.Item label={'Price'} required name='price'>
                    <InputNumber 
                        placeholder="Enter Price" 
                    />
                </Form.Item>
                <Form.Item label='Image' name='image'>
                    <Input 
                        placeholder="Enter Image Link" 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateMenuItem;