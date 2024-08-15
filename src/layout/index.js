import React, { useContext, useEffect, useState } from 'react';
import {
  DollarOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  TeamOutlined,
  BarChartOutlined,
  LockOutlined,
  RestOutlined,
  WalletOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Layout, theme } from 'antd';
import HeaderAdmin from '../components/HeaderComponent';
import FooterAdmin from '../components/FooterComponent';
import SiderAdmin from './SiderLayout';
import ChildrenContext from '../contexts/ChildrenContext';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { DivContainerWeb, DivSider } from './styles';
import { io } from 'socket.io-client';
import { API_GET_ON_MESSAGE } from '../configs/apis';
import { RoleContext } from '../contexts/UserContext';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function LayoutAdmin({ children }) {
  const [select, setSelect] = useState(
    window.location.pathname === '/' ||
      window.location.pathname.slice(1) === 'login' ||
      window.location.pathname.slice(1) === ''
      ? 'home'
      : window.location.pathname.slice(1),
  );

  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useContext(RoleContext);
  const items = [
    userInfo.role === 'superAdmin' &&
      getItem('Statistics', 'statistics', <BarChartOutlined />),
    getItem('Assets', 'assets', <WalletOutlined />, [
      getItem('Series', 'series'),
      getItem('Film for series', 'film-for-series'),
      getItem('Movies', 'movies'),
      getItem('Category', 'category'),
    ]),
    getItem('Manage', 'manage', <TeamOutlined />, [
      userInfo.role === 'superAdmin' && getItem('User', 'user'),
      getItem('Subscriber', 'subscriber'),
    ]),
    getItem('Payment', 'payment', <DollarOutlined />),
    getItem('Subscription price', 'subscription-price', <DollarOutlined />),
    getItem(
      'Support customer',
      'support-customer',
      <CustomerServiceOutlined />,
    ),
    getItem('Question', 'question', <QuestionCircleOutlined />, [
      getItem('Common questions', 'common-questions'),
      getItem('Customer Questions', 'customer-questions'),
    ]),
    getItem('Banned Account', 'banned account', <LockOutlined />, [
      getItem('Subscriber', 'banned-subscriber'),
    ]),
    getItem('Trash', 'trash', <RestOutlined />, [
      getItem('Series', 'trash-series'),
      getItem('Movies', 'trash-movies'),
      getItem('Film for series', 'trash-film-for-series'),
    ]),
    getItem('Logout', 'logout', <LogoutOutlined />),
  ];

  const navigate = useNavigate();

  const [listChat, setListChat] = useState([]);
  const [chooseChat, setChooseChat] = useState();
  const [message, setMessage] = useState({});
  const [socket, setSocket] = useState();
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  const newSocket = io('http://localhost:4000/admin');

  useEffect(() => {
    setSocket(newSocket);
    newSocket.on('chatCustomer', (newMessage) => {
      setMessage((prev) => ({
        ...prev,
        [newMessage.roomId]: [
          ...(prev[newMessage.roomId] || []),
          newMessage.data,
        ],
      }));
    });

    newSocket.on('delete-room', (data) => {
      if (userInfo.userId !== data.userId) {
        setListChat((prev) =>
          prev.filter((item) => item.roomId !== data.roomId),
        );
      }
    });

    newSocket.on('forceLeave', (roomId) => {
      setVisible((prev) => ({ ...prev, [roomId]: true }));
      newSocket.emit('leaveRoom', roomId);
    });

    newSocket.on('room', (data) => {
      setListChat((prev) => [...prev, data]);

      if (listChat.length > 0) {
        setChooseChat(listChat[0].roomId);
      } else {
        setChooseChat(data.roomId);
      }
    });

    return () => {
      newSocket.off('chatCustomer');
      newSocket.off('room');
      // newSocket.disconnect();
    };
  }, [message, listChat, userInfo]);

  useEffect(() => {
    setSelect(
      window.location.pathname === '/' ||
        window.location.pathname.slice(1) === 'login' ||
        window.location.pathname.slice(1) === ''
        ? 'statistics'
        : window.location.pathname.slice(1),
    );
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchListChat = async () => {
      const response = await fetch(API_GET_ON_MESSAGE, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      let list = [],
        mess = [];
      if (json.data.length > 0) {
        for (let i = 0; i < json.data.length; i++) {
          list.push({
            roomId: json.data[i].roomId,
            userId: json.data[i].participants.userId._id,
            adminId: json.data[i].participants?.adminId?._id
              ? json.data[i].participants.adminId._id
              : '',
            firstName: json.data[i].participants.userId.firstName,
            lastName: json.data[i].participants.userId.lastName,
            userInfo: json.data[i].participants.userId,
          });
          mess = {
            ...mess,
            [json.data[i].roomId]: json.data[i].messages,
          };
        }
        if (list.length > 0) {
          setChooseChat(list[0].roomId);
        }
        setListChat(list);
        setMessage(mess);
      }
    };
    fetchListChat();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (select) => {
    navigate(`/${select}`);
  };

  const handleOutRoom = (roomId) => {
    setVisible((prev) => ({ ...prev, [roomId]: false }));
    setMessage((prev) => {
      let newMessage = { ...prev };
      delete newMessage[roomId];
      return newMessage;
    });
    setListChat((prev) => prev.filter((item) => item.roomId !== roomId));

    if (listChat.length - 1 > 0) {
      setChooseChat(listChat[0].roomId);
    } else {
      setChooseChat();
    }
  };

  if (!items) {
    return (
      <div className="loading-component">
        <div>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      </div>
    );
  }

  return (
    <DivContainerWeb>
      <DivSider>
        <div>
          <SiderAdmin
            items={items}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            select={select}
            setSelect={setSelect}
            handleSelect={handleSelect}
          />
        </div>
      </DivSider>
      <Layout className="layout-content-web">
        <HeaderAdmin
          bgColor={colorBgContainer}
          title={`${select}`.toUpperCase()}
        />
        <ChildrenContext.Provider
          value={{
            select: select,
            socket,
            message,
            setMessage,
            listChat,
            setListChat,
            input,
            setInput,
            chooseChat,
            setChooseChat,
            isLoading,
            visible,
            handleOutRoom,
            setImagePreview,
            imagePreview,
            setFile,
            file,
          }}>
          {children}
        </ChildrenContext.Provider>

        <FooterAdmin />
      </Layout>
    </DivContainerWeb>
  );
}
export default LayoutAdmin;
