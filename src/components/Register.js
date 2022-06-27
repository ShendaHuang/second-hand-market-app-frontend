import React from "react";
import {Form, Input, Button, message} from 'antd';
import axios from 'axios';

import {BASE_URL} from "../constants";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(props) {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const {Email, UserName, UserPwd, Phone, University} = values;
        const opt = {
            method: 'POST',
            url: `${BASE_URL}/signup`,
            data: {
                Email: Email,
                UserName: UserName,
                UserPwd: UserPwd,
                Phone: Phone,
                University: University
            },
            headers: {'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                console.log(response)
                // case1: registered success
                if (response.status === 200) {
                    message.success('Registration succeed!');
                    //栈记录，弹出到login
                    props.history.push('/login');
                }
            })
            .catch(error => {
                console.log('register failed: ', error.message);
                message.success('Registration failed!');
                // throw new Error('Signup Failed!')
            })
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="register"
        >
            <Form.Item
                name="Email"
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="UserName"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="UserPwd"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['UserPwd']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('UserPwd') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                name="Phone"
                label="Phone number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="University"
                label="University"
                rules={[
                    {
                        required: true,
                        message: 'Please input your University!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="register-btn">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;