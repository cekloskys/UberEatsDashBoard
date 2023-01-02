import { Form, Card, Button, Input } from "antd";

const Settings = () => {
    return (
        <Card title='Restaurant Details' style={{margin: 20,}}>
            <Form layout='vertical'>
                <Form.Item label='Name' required>
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label='Address' required>
                    <Input placeholder="Enter Address" />
                </Form.Item>
                <Form.Item label='Image' required>
                    <Input placeholder="Enter Image Link" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary'>Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;