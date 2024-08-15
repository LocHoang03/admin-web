import {
  Button,
  Form,
  Input,
  Select,
  notification,
  InputNumber,
  message,
} from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { useDispatch } from 'react-redux';
import {
  createCategory,
  updateCategory,
} from '../../redux/Action/Assets/category';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext } from 'react';
import { updatePackage } from '../../redux/Action/Package';
import { createPayment } from '../../redux/Action/Payment';

function FormAddPackage(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const { type, dataRecord } = useContext(FormModalContext);
  const openNotification = (placement, message) => {
    notification.error({
      message: `Notification Error`,
      description: message,
      placement,
    });
  };

  const onFinish = async (values) => {
    let dataBody;
    switch (type) {
      case 'subscription-price':
        dataBody = {
          typePack: values.typePack,
          qualityPicture: values.qualityPicture,
          resolution: values.resolution,
          deviceSupport: values.deviceSupport,
          quantityWatch: values.quantityWatch,
          quantityDownload: values.quantityDownload,
        };
        break;
      case 'payment':
        dataBody = {
          userId: values.emailSubscriber,
          packageId: values.typePackage,
        };
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        switch (type) {
          case 'subscription-price':
            let dataPost = {
              Id: dataRecord._id,
              dataBody: dataBody,
            };
            dispatch(updatePackage(dataPost));
            props.handleCancel();
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'payment':
            dispatch(createPayment(dataBody));
            props.handleCancel();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {contextHolder}
      {
        <Form
          form={props.form}
          name={'Package form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          {type !== 'payment' ? (
            <>
              <ItemForm
                label="Type package"
                name="typePack"
                message="Please input your type package!"
                input={<Input />}
              />

              <ItemForm
                label="Quality picture"
                name="qualityPicture"
                message="Please input quality picture!"
                input={<Input />}
              />

              <ItemForm
                label="Resolution"
                name="resolution"
                message="Please input resolution!"
                input={<Input />}
              />

              <ItemForm
                label="Device support"
                name="deviceSupport"
                message="Please input device support!"
                input={<Input />}
              />
              <ItemForm
                label="quantity watch"
                name="quantityWatch"
                message="Please input quantity watch!"
                input={<InputNumber />}
              />

              <ItemForm
                label="Quantity download"
                name="quantityDownload"
                message="Please input quantity download!"
                input={<InputNumber />}
              />
            </>
          ) : (
            <>
              <ItemForm
                label={'Email subscriber'}
                name="emailSubscriber"
                message={`Please select email subscriber!`}
                input={
                  <Select
                    showSearch
                    placeholder="Select a email subscriber"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.options2}
                  />
                }
              />
              <ItemForm
                label={'Type Package'}
                name="typePackage"
                message={`Please select type package!`}
                input={
                  <Select
                    showSearch
                    placeholder="Select a package"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.options}
                  />
                }
              />
            </>
          )}
          <Form.Item
            wrapperCol={{
              span: 24,
            }}
            className="add-film-button">
            <Button htmlType="submit">
              {dataRecord === undefined ? 'Add Package' : 'Update Package'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}

export default FormAddPackage;
