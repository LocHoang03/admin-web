import { DivForm } from './styles';
import { Button, Form, Select, Input } from 'antd';
import InputItem from '../Common/InputItem';
import validator from 'validator';
import { useContext, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { RoleContext } from '../../contexts/UserContext';
import { API_UPDATE_PROFILE, API_CHANGE_PASSWORD } from '../../configs/apis';

function FormUpdateProfile(props) {
  const { updateUserInfo } = useContext(RoleContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (props.type === 'edit') {
      if (
        validator.isEmail(values.email) &&
        validator.isMobilePhone(values.phoneNumber)
      ) {
        setLoading(true);
        const response = await fetch(API_UPDATE_PROFILE, {
          method: 'PATCH',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        });
        const json = await response.json();
        if (json.success) {
          updateUserInfo(json.token);
          setLoading(false);
          props.success('Update profile successfully.');
        } else {
          setLoading(false);
          props.error(json.message);
        }
      }
    } else {
      setLoading(true);
      const response = await fetch(API_CHANGE_PASSWORD, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        updateUserInfo(json.token);
        setLoading(false);
        props.success('Change password successfully.');
      } else {
        setLoading(false);
        props.error(json.message);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {};

  if (loading) {
    return (
      <DivForm>
        <LoadingComponent />
      </DivForm>
    );
  }

  return (
    <>
      <DivForm>
        {props.type === 'edit' ? (
          <Form
            form={props.form}
            name={'profileUpdateUser'}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              textAlign: 'center',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off">
            <InputItem
              label="First Name"
              name="firstName"
              message="Please input your first name!"
              input={<Input />}
            />
            <InputItem
              label="Last Name"
              name="lastName"
              message="Please input your last name!"
              input={<Input />}
            />
            <InputItem
              label="E-mail"
              name="email"
              message="Please input your email!"
              input={<Input disabled />}
            />
            <InputItem
              label="Phone Number"
              name="phoneNumber"
              message="Please input your phone number!"
              input={<Input />}
            />
            <InputItem
              label="Gender"
              name="sex"
              input={
                <Select
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  allowClear
                  options={props.options}
                />
              }
            />
            <Form.Item
              wrapperCol={{
                span: 24,
              }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name={'profileChangePasswordUser'}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              textAlign: 'center',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off">
            <InputItem
              label="Current Password"
              name="currentPassword"
              message="Please input your current password!"
              input={<Input.Password />}
            />
            <InputItem
              label="New Password"
              name="newPassword"
              message="Please input your new password!"
              input={<Input.Password />}
            />
            <InputItem
              label="Confirm New Password"
              name="confirmNewPassword"
              message="Please input your confirm new password!"
              input={<Input.Password />}
            />
            <Form.Item
              wrapperCol={{
                span: 24,
              }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </DivForm>
    </>
  );
}

export default FormUpdateProfile;
