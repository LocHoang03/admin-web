import { ModalDetail, Title, Description, TitleUser, InfoUser } from './styles';

import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailQuestions({
  setIsModalDetail,
  isModalDetail,
  asset,
  type,
}) {
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
        title={
          type === 'common-questions'
            ? 'Detail Common Questions'
            : 'Detail Custom Questions'
        }
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      title={
        type === 'common-questions'
          ? 'Detail Common Questions'
          : 'Detail Custom Questions'
      }
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Title>
        {type === 'customer-questions'
          ? 'Title question customer'
          : 'Title question'}
        : {data.title}
      </Title>
      <Description>
        {type === 'customer-questions'
          ? 'Description detail question'
          : 'Description detail'}
        : {data.description}
      </Description>
      {type === 'customer-questions' && (
        <>
          <TitleUser>Information of the person reporting</TitleUser>
          <InfoUser>First name: {data.firstName}</InfoUser>
          <InfoUser>Last name: {data.lastName}</InfoUser>
          <InfoUser>Email: {data.email}</InfoUser>
          <InfoUser>Phone number: {data.phoneNumber}</InfoUser>
          <InfoUser>Gender: {data.userId.sex}</InfoUser>
        </>
      )}
    </ModalDetail>
  );
}

export default memo(ModalDetailQuestions);
