import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  Select,
  notification,
  InputNumber,
  message,
  Checkbox,
} from 'antd';
import ItemForm from '../Common/ItemFormAdd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createMovies, updateMovies } from '../../redux/Action/Assets/movies';
import {
  createCategory,
  updateCategory,
} from '../../redux/Action/Assets/category';
import { createSeries, updateSeries } from '../../redux/Action/Assets/series';
import FormModalContext from '../../contexts/FormModalContext';
import { useContext, useState } from 'react';
import {
  createFilmForSeries,
  updateFilmForSeries,
} from '../../redux/Action/Assets/filmForSeries';
import { DivCheckUpdate } from './styles';
import { API_SERIES_ADMIN } from '../../configs/apis';

function FormAddModal(props) {
  const [seriesId, setSeriesId] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const { type, dataRecord, options, setDefaultValue, setIsLoading } =
    useContext(FormModalContext);
  const openNotification = (placement, message) => {
    notification.error({
      message: `Notification Error`,
      description: message,
      placement,
    });
  };

  const onFinish = async (values) => {
    if (type === 'film-for-series') {
      let type = dataRecord ? 'update' : 'create';
      let data;
      if (dataRecord) {
        data = {
          number: values.filmSerialNumber,
          type: type,
          numberUpdate: dataRecord.filmSerialNumber,
        };
      } else {
        data = {
          number: values.filmSerialNumber,
          type: type,
        };
      }

      const response = await fetch(
        API_SERIES_ADMIN + '/' + values.listSeries + '/check-series-number',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
          },
        },
      );
      const json = await response.json();
      if (!json.success) {
        messageApi.open({
          type: 'error',
          content: json.message,
          duration: 2,
        });
        return;
      }
    }

    if (type === 'movies') {
      if (
        values.imageUrl &&
        values.imageUrl.file.type !== 'image/jpeg' &&
        values.imageUrl.file.type !== 'image/jpg' &&
        values.imageUrl.file.type !== 'image/png'
      ) {
        openNotification('top', 'Invalid image type!!');
        return;
      }

      if (values.videoUrl && values.videoUrl.file.type !== 'video/mp4') {
        openNotification('top', 'Invalid video type!!');
        return;
      }
    }
    let formData = new FormData();
    let dataBody;
    switch (type) {
      case 'series':
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (dataRecord) {
          if (props.checkVideoTrailer)
            formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        } else {
          formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        }
        if (dataRecord) {
          if (props.checkImageFilm)
            formData.append('imageUrl', values.imageUrl.file);
        } else {
          formData.append('imageUrl', values.imageUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('director', values.director);
        formData.append('cast', values.cast);
        formData.append('country', values.country);
        formData.append('listCategoryId', values.listCategoryId);
        formData.append('listPackageIdBand', values.listPackageIdBand);
        break;
      case 'movies':
        formData.append('title', values.title);
        formData.append('description', values.description);
        if (dataRecord) {
          if (props.checkVideoTrailer)
            formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        } else {
          formData.append('videoTrailerUrl', values.videoTrailerUrl.file);
        }
        if (dataRecord) {
          if (props.checkImageFilm)
            formData.append('imageUrl', values.imageUrl.file);
        } else {
          formData.append('imageUrl', values.imageUrl.file);
        }
        if (dataRecord) {
          if (props.checkVideoFilm)
            formData.append('videoUrl', values.videoUrl.file);
        } else {
          formData.append('videoUrl', values.videoUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('director', values.director);
        formData.append('cast', values.cast);
        formData.append('country', values.country);
        formData.append('listCategoryId', values.listCategoryId);
        formData.append('listPackageIdBand', values.listPackageIdBand);
        break;
      case 'category':
        dataBody = {
          name: values.name,
        };
        break;
      case 'film-for-series':
        if (dataRecord) {
          if (props.checkVideoFilm)
            formData.append('videoUrl', values.videoUrl.file);
        } else {
          formData.append('videoUrl', values.videoUrl.file);
        }
        formData.append('releaseDate', values.releaseDate.$y);
        formData.append('filmSerialNumber', values.filmSerialNumber);
        break;
      default:
        break;
    }

    try {
      if (dataRecord !== undefined) {
        let data;

        switch (type) {
          case 'series':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateSeries(data));

            break;
          case 'movies':
            data = {
              formData: formData,
              Id: dataRecord._id,
            };
            dispatch(updateMovies(data));
            break;
          case 'category':
            data = {
              formData: dataBody,
              Id: dataRecord._id,
            };
            dispatch(updateCategory(data));
            break;
          case 'film-for-series':
            data = {
              formData: formData,
              Id: dataRecord._id,
              seriesId: values.listSeries,
            };
            dispatch(updateFilmForSeries(data));
            setDefaultValue(options[0].value);
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'series':
            dispatch(createSeries(formData));
            break;
          case 'movies':
            dispatch(createMovies(formData));
            break;
          case 'category':
            dispatch(createCategory(dataBody));
            break;
          case 'film-for-series':
            let data = {
              formData: formData,
              seriesId: values.listSeries,
            };
            dispatch(createFilmForSeries(data));
            setDefaultValue(options[0].value);
            break;
          default:
            break;
        }
      }
      setIsLoading(true);
      props.handleCancel();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    if (value !== '') {
      setSeriesId(value);
    }
  };

  const onChangeCheckbox = (e, type) => {
    if (type === 'video-trailer') {
      props.setCheckVideoTrailer(e.target.checked);
    } else if (type === 'image') {
      props.setCheckImageFilm(e.target.checked);
    } else {
      props.setCheckVideoFilm(e.target.checked);
    }
  };

  return (
    <>
      {contextHolder}
      {dataRecord &&
        (type === 'movies' ||
          type === 'series' ||
          type === 'film-for-series') && (
          <DivCheckUpdate>
            {type !== 'film-for-series' && (
              <>
                <Checkbox
                  checked={props.checkImageFilm}
                  onChange={(e) => onChangeCheckbox(e, 'image')}>
                  Image film
                </Checkbox>
                <Checkbox
                  checked={props.checkVideoTrailer}
                  onChange={(e) => onChangeCheckbox(e, 'video-trailer')}>
                  Video trailer
                </Checkbox>
              </>
            )}
            {type !== 'series' && (
              <Checkbox
                checked={props.checkVideoFilm}
                onChange={(e) => onChangeCheckbox(e, 'video')}>
                Video film
              </Checkbox>
            )}
          </DivCheckUpdate>
        )}
      {
        <Form
          form={props.form}
          name={type + 'Form'}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          {type !== 'film-for-series' && (
            <ItemForm
              label={'Name ' + (type.charAt(0).toUpperCase() + type.slice(1))}
              name={(type === 'category' && 'name') || 'title'}
              message={`Please input your name ${type}!`}
              input={<Input />}
            />
          )}

          {(type === 'series' || type === 'movies') && (
            <>
              <ItemForm
                label="Description"
                name="description"
                message="Please input your description!"
                input={<Input />}
              />

              {dataRecord ? (
                props.checkImageFilm && (
                  <ItemForm
                    label={`Image ${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } Url`}
                    name="imageUrl"
                    message="Please input your image url!"
                    input={
                      <Upload
                        maxCount={1}
                        beforeUpload={(file) => {
                          if (
                            file.type !== 'image/jpeg' &&
                            file.type !== 'image/jpg' &&
                            file.type !== 'image/png'
                          ) {
                            return Upload.LIST_IGNORE;
                          }
                          return false;
                        }}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    }
                  />
                )
              ) : (
                <ItemForm
                  label={`Image ${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Url`}
                  name="imageUrl"
                  message="Please input your image url!"
                  input={
                    <Upload
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (
                          file.type !== 'image/jpeg' &&
                          file.type !== 'image/jpg' &&
                          file.type !== 'image/png'
                        ) {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )}

              {dataRecord ? (
                props.checkVideoTrailer && (
                  <ItemForm
                    label={`Video trailer ${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } Url`}
                    name="videoTrailerUrl"
                    message="Please input your video trailer url!"
                    input={
                      <Upload
                        showUploadList={true}
                        maxCount={1}
                        beforeUpload={(file) => {
                          if (file.type !== 'video/mp4') {
                            return Upload.LIST_IGNORE;
                          }
                          return false;
                        }}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                      </Upload>
                    }
                  />
                )
              ) : (
                <ItemForm
                  label={`Video trailer ${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Url`}
                  name="videoTrailerUrl"
                  message="Please input your video trailer url!"
                  input={
                    <Upload
                      showUploadList={true}
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (file.type !== 'video/mp4') {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )}
            </>
          )}

          {(type === 'movies' || type === 'film-for-series') &&
            (dataRecord ? (
              props.checkVideoFilm && (
                <ItemForm
                  label="Video Film Url"
                  name="videoUrl"
                  message="Please input your video url!"
                  input={
                    <Upload
                      showUploadList={true}
                      maxCount={1}
                      beforeUpload={(file) => {
                        if (file.type !== 'video/mp4') {
                          return Upload.LIST_IGNORE;
                        }
                        return false;
                      }}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  }
                />
              )
            ) : (
              <ItemForm
                label="Video Film Url"
                name="videoUrl"
                message="Please input your video url!"
                input={
                  <Upload
                    showUploadList={true}
                    maxCount={1}
                    beforeUpload={(file) => {
                      if (file.type !== 'video/mp4') {
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                }
              />
            ))}

          {type === 'film-for-series' && (
            <>
              <ItemForm
                label="Film serial number"
                name="filmSerialNumber"
                message="Please input your film serial number!"
                input={<InputNumber min={1} type="number" />}
              />
              <ItemForm
                label="Release Date"
                name="releaseDate"
                message="Please input your release date!"
                input={<DatePicker picker="year" />}
              />
              <ItemForm
                label={'Film for series'}
                name="listSeries"
                message={`Please select your series!`}
                input={
                  <Select
                    showSearch
                    placeholder="Select a series"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={options}
                  />
                }
              />
            </>
          )}

          {(type === 'movies' || type === 'series') && (
            <>
              <ItemForm
                label="Release Date"
                name="releaseDate"
                message="Please input your release date!"
                input={<DatePicker picker="year" />}
              />

              <ItemForm
                label="Director"
                name="director"
                message="Please input your director!"
                input={<Input />}
              />

              <ItemForm
                label="Cast"
                name="cast"
                message="Please input your cast!"
                initialValue={dataRecord !== undefined ? dataRecord.cast : ''}
                input={<Input />}
              />

              <ItemForm
                label="Country"
                name="country"
                message="Please select your country!"
                input={
                  <Select
                    showSearch
                    mode="multiple"
                    onChange={(value) => {
                      props.setValueCountries(value);
                    }}
                    value={props.valueCountries}
                    placeholder={'Select a country'}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={props.countriesData}
                  />
                }
              />

              <ItemForm
                label={
                  type === 'movies'
                    ? 'Film for category'
                    : 'Series for category'
                }
                name="listCategoryId"
                message={`Please select your ${type} for category!`}
                input={
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    options={props.options}
                  />
                }
              />

              <ItemForm
                label={
                  type === 'movies'
                    ? 'Film for package not allows watch'
                    : 'Series for package not allows watch'
                }
                name="listPackageIdBand"
                message={`Please select your ${type} for package!`}
                input={
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please select"
                    options={props.options2}
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
              {dataRecord !== undefined
                ? type !== 'film-for-series'
                  ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)}`
                  : 'Update film'
                : type !== 'film-for-series'
                ? `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`
                : 'Add film'}
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  );
}

export default FormAddModal;
