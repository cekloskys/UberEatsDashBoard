import { Form, Input, Button, Card, InputNumber } from "antd";

const { TextArea } = Input;

const CreateMenuItem = () => {
    return (
        <Card title={'Create New Item'} style={{margin: 20,}}>
            <Form layout='vertical'>
                <Form.Item label={'Name'} required>
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label={'Description'} required>
                    <TextArea rows={4} placeholder="Enter Description" />
                </Form.Item>
                <Form.Item label={'Price'} required>
                    <InputNumber placeholder="Enter Price" />
                </Form.Item>
                <Form.Item label='Image'>
                    <Input placeholder="Enter Image Link" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateMenuItem;