import { Button, Form, Input, Select, notification, message } from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';

import FormModalContext from '../../contexts/FormModalContext';
import { useContext, useState } from 'react';
import { createPayment } from '../../redux/Action/Payment';
import { createUser, updateUser } from '../../redux/Action/Manage/user';
import { API_POST_CREATE_USER, API_POST_UPDATE_USER } from '../../configs/apis';

function FormAddUser(props) {
  const [options, setOptions] = useState([
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ]);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const success = (text) => {
    messageApi.open({
      type: 'success',
      content: text,
      duration: 2,
    });
  };
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
      duration: 2,
    });
  };

  const { dataRecord } = useContext(FormModalContext);

  const onFinish = async (values) => {
    let dataBody;
    dataBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      sex: values.sex,
    };

    try {
      if (dataRecord !== undefined) {
        const response = await fetch(
          API_POST_UPDATE_USER + '/' + dataRecord._id,
          {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          success('Updated user successfully.');
          dispatch(updateUser({ userId: dataRecord._id, data: dataBody }));
          props.handleCancel();
        } else {
          error(data.message);
          return;
        }
      } else {
        const response = await fetch(API_POST_CREATE_USER, {
          method: 'POST',
          body: JSON.stringify(dataBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        });
        const data = await response.json();
        if (data.success) {
          success('Created user successfully.');
          dispatch(createUser(data.user));
          props.handleCancel();
        } else {
          error(data.message);
          return;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      {contextHolder}
      {
        <Form
          form={props.form}
          name={'User form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <>
            <ItemForm
              label={'First name'}
              name="firstName"
              message={`Please enter your first name!`}
              input={<Input />}
            />
            <ItemForm
              label={'Last name'}
              name="lastName"
              message={`Please enter your last name!`}
              input={<Input />}
            />
            <ItemForm
              label={'Email'}
              name="email"
              message={`Please enter your email!`}
              input={<Input />}
            />
            <ItemForm
              label={'Phone number'}
              name="phoneNumber"
              message={`Please enter your phone number!`}
              input={<Input />}
            />
            <ItemForm
              label={'Gender'}
              name="sex"
              message={`Please enter your gender!`}
              input={
                <Select
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  allowClear
                  options={options}
                />
              }
            />
          </>
          <Form.Item
            wrapperCol={{
              span: 48,
            }}
            className="add-film-button">
            <Button htmlType="submit">
              {dataRecord === undefined ? 'Add User' : 'Update User'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}

export default FormAddUser;
