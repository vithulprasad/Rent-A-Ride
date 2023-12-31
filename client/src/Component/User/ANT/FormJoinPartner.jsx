import { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Space, Divider } from 'antd';

const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FormJoinComponent = ({ onFormSubmit }) => {
  const [button, setButton] = useState(true);
  const [form] = Form.useForm();

  const [items, setItems] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    const newItem = name || `New item ${items.length + 1}`;
    setItems([...items, newItem]);
    setSelectedLocations([...selectedLocations, newItem]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+90</Option>
        <Option value="87">+91</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const onFinish = (values) => {
    setButton(false);
    if (onFormSubmit) {
      onFormSubmit({ ...values, selectedLocations });
    }
  };

  return (
    <Form
      name="register"
      form={form}
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not a valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="State"
        label="State"
        tooltip="Please provide a state"
        rules={[
          {
            required: true,
            message: 'Please input your state!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="district"
        label="District"
        tooltip="What is your district?"
        rules={[
          {
            required: true,
            message: 'Please input your district!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="local_area"
        label="Local Area"
        tooltip="What is the local area?"
        rules={[
          {
            required: true,
            message: 'Please input your local area!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="post"
        label="Post"
        tooltip="enter your post area?"
        rules={[
          {
            required: true,
            message: 'Please input your Post!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="pin"
        label="Pin"
        tooltip="What is the pin ?"
        rules={[
          {
            required: true,
            message: 'Please input your PIN!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Age"
        label="Age"
        type="number"
        tooltip="What is your age?"
        rules={[
          {
            required: true,
            message: 'Please input your age!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="CompanyName"
        label="CompanyName"
        tooltip="enter your post area?"
        rules={[
          {
            required: true,
            message: 'Please input your Post!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: 'Please select your gender!',
          },
        ]}
      >
        <Select placeholder="Select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Divider />
      <h1>Add Locations</h1>
      <Select
        style={{
          width: 300,
        }}
        placeholder="Current location for the users"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: '8px 0',
              }}
            />
            <Space
              style={{
                padding: '0 8px 4px',
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={items.map((item, index) => ({
          label: item,
          value: item,
          key: index,
        }))}
      />

      <Form.Item {...tailFormItemLayout}>
        {button ? (
          <Button className="bg-green-700" type="primary" htmlType="submit">
            Register
          </Button>
        ) : (
          <Button
            style={{ background: 'grey', color: 'white' }}
            disabled
            className="text-white bg-green-700"
            type="primary"
          >
            Processing.....
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormJoinComponent;
