import {
  ModalDetail,
  DivInfoDetail,
  InfoDetail,
  DivImage,
  InfoItem,
} from './styles';

import { Button, Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailUser({ setIsModalDetail, isModalDetail, asset, type }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (asset) {
      setData(asset);
    }
  }, [asset]);

  const handleOk = () => {
    setIsModalDetail(false);
  };
  const handleCancel = () => {
    setIsModalDetail(false);
  };

  if (!asset || !data) {
    return (
      <ModalDetail
        title={type === 'user' ? 'Detail User' : 'Detail Subscriber'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        className="modal-detail-user">
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      title={type === 'user' ? 'Detail User' : 'Detail Subscriber'}
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
      className="modal-detail-user">
      <DivInfoDetail>
        <InfoDetail>
          <InfoItem>First name: {data.firstName}</InfoItem>
          <InfoItem>Last name: {data.lastName}</InfoItem>
          <InfoItem>Email: {data.email}</InfoItem>
          <InfoItem>Phone number: {data.phoneNumber}</InfoItem>
          <InfoItem>Sex: {data.sex}</InfoItem>
          {type === 'user' && <InfoItem>Role: {data.role}</InfoItem>}
        </InfoDetail>
        <DivImage>
          <h2>Image User</h2>
          <Image
            width={260}
            height={260}
            src={data.avatarUser.url}
            alt={data.avatarUser.imageId}
          />
        </DivImage>
      </DivInfoDetail>
    </ModalDetail>
  );
}

export default memo(ModalDetailUser);
