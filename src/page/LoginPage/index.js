import {
  DivContainer,
  DivContent,
  DivLogo,
  DivTitle,
  DivForm,
  ContentLogin,
  DivLink,
  Text,
  DivImageLogin,
  ImageLogin,
  ErrorMessage,
} from './styles';
import ItemFormLogin from '../../components/Common/ItemFormLogin';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LogoImage from '../../components/LogoImage';
import { API_LOGIN } from '../../configs/apis';

function LoginPage() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.open({
      type: 'success',
      content: text,
      duration: 2,
    });
  };

  const onFinish = async (values) => {
    setError();
    const response = await fetch(API_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();

    if (responseJson.success) {
      success('Login successfully.');
      await localStorage.setItem('tokenManager', responseJson.token);
      if (localStorage.getItem('tokenManager')) {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } else {
      setError(responseJson.message);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const handleFocus = () => {
    setError();
  };

  return (
    <DivContainer>
      {contextHolder}
      <DivContent>
        <ContentLogin>
          <DivLogo>
            <LogoImage height="60" width="300" />
          </DivLogo>
          <DivTitle>
            <h2>Welcome Back!!</h2>
          </DivTitle>
          <DivForm>
            <Form
              name="loginForm"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <ItemFormLogin
                label="Email"
                name="email"
                message="Please input your email!"
                input={
                  <Input onFocus={handleFocus} className="form-add-modal" />
                }
              />

              <ItemFormLogin
                label="Password"
                name="password"
                message="Please input your password!"
                input={
                  <Input.Password
                    onFocus={handleFocus}
                    className="form-add-modal"
                  />
                }
              />

              <Form.Item
                className="button-form"
                wrapperCol={{
                  span: 24,
                }}>
                <Button htmlType="submit">Sign in</Button>
                {error && <ErrorMessage>{error}!!</ErrorMessage>}
              </Form.Item>
            </Form>
          </DivForm>
        </ContentLogin>
        <DivImageLogin>
          <ImageLogin src="https://res.cloudinary.com/dzxupp48t/image/upload/v1710852307/image-webFilm/bmnvx1mjcgw2jjvmhjet.jpg" />
        </DivImageLogin>
      </DivContent>
    </DivContainer>
  );
}

export default LoginPage;
