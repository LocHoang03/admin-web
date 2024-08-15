import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_VERIFY_TOKEN } from '../../configs/apis';

export const RoleContext = createContext();

function UserContext({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState();
  const [isUpdateUser, setIsUpdateUser] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLogin(undefined);
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
        setIsLogin(true);
      } else {
        setUserInfo('');
        setIsLogin(false);
      }
    };
    if (localStorage.getItem('tokenManager')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
      setIsLogin(false);
    }
  }, [pathname]);

  useEffect(() => {
    setIsLogin(undefined);
    if (localStorage.getItem('tokenManager') && userInfo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pathname]);

  useEffect(() => {
    setIsUpdateUser(false);
    const fetchUserInfo = async () => {
      const response = await fetch(API_VERIFY_TOKEN, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      });
      const json = await response.json();
      if (json.success) {
        setUserInfo(json.userInfo);
      } else {
        setUserInfo('');
      }
    };
    if (localStorage.getItem('tokenManager')) {
      fetchUserInfo();
    } else {
      setUserInfo('');
    }
  }, [isUpdateUser]);

  const updateUserInfo = (token) => {
    const updateToken = async () => {
      await localStorage.removeItem('tokenManager');
      await localStorage.setItem('tokenManager', token);
      setIsUpdateUser((prev) => !prev);
    };
    updateToken();
  };

  return (
    <RoleContext.Provider
      value={{
        userInfo,
        isLogin,
        updateUserInfo,
      }}>
      {children}
    </RoleContext.Provider>
  );
}

export default UserContext;
