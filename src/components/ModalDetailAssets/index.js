import {
  ModalDetail,
  DivTitle,
  TitleDetail,
  VideoDetail,
  DivVideo,
  DivInfoDetail,
  InfoDetail,
  DivImage,
  InfoItem,
  DivVideoFilm,
  DivInfo,
  ListInfo,
  ItemInfo,
} from './styles';

import dayjs from 'dayjs';
import { Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

function ModalDetailAssets({ setIsModalDetail, isModalDetail, asset, type }) {
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
        title={type === 'category' ? 'Detail Category' : 'Detail Asset'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  if (type === 'movies' && !data && !data.videoUrl && !data.videoUrl.url) {
    return (
      <ModalDetail
        title={type === 'category' ? 'Detail Category' : 'Detail Asset'}
        open={isModalDetail}
        onOk={handleOk}
        onCancel={handleCancel}>
        <LoadingComponent />
      </ModalDetail>
    );
  }

  return (
    <ModalDetail
      className="detail-assets"
      title={
        type === 'category'
          ? 'Detail Category'
          : type !== 'film-for-series' &&
            type !== 'trash-film-for-series' &&
            type !== 'payment'
          ? 'Detail Asset'
          : type !== 'payment'
          ? 'Detail Asset Series ' + data.seriesId.title
          : 'Detail Package'
      }
      open={isModalDetail}
      onOk={handleOk}
      onCancel={handleCancel}>
      <DivTitle>
        {type === 'category' ? (
          <TitleDetail>Name category : {data.name}</TitleDetail>
        ) : type !== 'film-for-series' &&
          type !== 'trash-film-for-series' &&
          type !== 'payment' &&
          type !== 'subscription-price' ? (
          <TitleDetail>Name film : {data.title}</TitleDetail>
        ) : type !== 'payment' && type !== 'subscription-price' ? (
          <TitleDetail>Episode {data.filmSerialNumber}</TitleDetail>
        ) : type === 'payment' ? (
          <TitleDetail>
            Information about customers purchasing packages
          </TitleDetail>
        ) : (
          <TitleDetail>Information packages</TitleDetail>
        )}
      </DivTitle>

      {type !== 'category' &&
        type !== 'film-for-series' &&
        type !== 'trash-film-for-series' && (
          <>
            {(type === 'movies' || type === 'series') && (
              <DivVideo>
                <h2>Trailer </h2>
                <VideoDetail>
                  <iframe
                    width="100%"
                    height="400"
                    title={data.title}
                    src={data?.videoTrailerUrl?.url || data?.videoUrl?.url}
                    frameBorder="0"
                    style={{ borderRadius: '20px' }}
                    allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </VideoDetail>
              </DivVideo>
            )}
            {type === 'movies' && (
              <DivVideo>
                <h2>Video</h2>
                <VideoDetail>
                  <iframe
                    width="100%"
                    height="400"
                    title={data.title}
                    src={data.videoUrl.url}
                    frameBorder="0"
                    style={{ borderRadius: '20px' }}
                    allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </VideoDetail>
              </DivVideo>
            )}
            <DivInfoDetail>
              <InfoDetail>
                <h2>Information Detail </h2>
                {type !== 'payment' && type !== 'subscription-price' && (
                  <InfoItem>Description: {data.description}</InfoItem>
                )}
                {(type === 'movies' || type === 'series') && (
                  <InfoItem>Director: {data.director}</InfoItem>
                )}
                {(type === 'movies' || type === 'series') && (
                  <InfoItem>Cast: {data.cast}</InfoItem>
                )}
                {(type === 'movies' || type === 'series') && (
                  <InfoItem>Duration: {data.duration} minute</InfoItem>
                )}
                {(type === 'movies' || type === 'series') && (
                  <InfoItem>Country: {data.country.join(', ')}</InfoItem>
                )}

                {type !== 'payment' && type !== 'subscription-price' && (
                  <InfoItem>Rating: {data.rating}/5</InfoItem>
                )}
                {(type === 'movies' || type === 'series') && (
                  <InfoItem>Release Date: {data.releaseDate}</InfoItem>
                )}

                {type === 'payment' && (
                  <>
                    <InfoItem>
                      Username: {data.userId.firstName} {data.userId.lastName}
                    </InfoItem>
                    <InfoItem>Email: {data.userId.email}</InfoItem>
                    <InfoItem>Phone number: {data.userId.phoneNumber}</InfoItem>
                    <InfoItem>Package type in use: {data.typePack}</InfoItem>
                    <InfoItem>Monthly price: ${data.monthlyPrice}</InfoItem>
                  </>
                )}

                {type !== 'subscription-price' && (
                  <InfoItem>
                    Created At: {dayjs(data.createAt).format('DD-MM-YYYY')}
                  </InfoItem>
                )}
                {type === 'payment' && (
                  <InfoItem>
                    Expiration date:{' '}
                    {dayjs(data.expirationDate).format('DD-MM-YYYY')}
                  </InfoItem>
                )}
              </InfoDetail>
              {type !== 'subscription-price' && (
                <DivImage>
                  <h2>{type !== 'payment' ? 'Image Film' : 'Image user'}</h2>
                  <Image
                    width={250}
                    height={350}
                    src={
                      data && data.userId && data.userId.avatarUser.url
                        ? data.userId.avatarUser.url
                        : data.imageUrl.url
                    }
                    alt={data.title || 'image user'}
                  />
                </DivImage>
              )}
            </DivInfoDetail>
            {type === 'subscription-price' && (
              <DivInfo>
                <ListInfo>
                  <ItemInfo>Type package: {data.typePack}</ItemInfo>
                  <ItemInfo>Monthly price: ${data.monthlyPrice}</ItemInfo>
                  <ItemInfo>Quality picture: {data.qualityPicture}</ItemInfo>
                  <ItemInfo>Resolution: {data.resolution}</ItemInfo>
                  <ItemInfo>DeviceSupport: {data.deviceSupport}</ItemInfo>
                  <ItemInfo>Quantity watch: {data.quantityWatch}</ItemInfo>
                  <ItemInfo>
                    Quantity download: {data.quantityDownload}
                  </ItemInfo>
                  <ItemInfo>
                    Created at: {dayjs(data.createAt).format('DD-MM-YYYY')}
                  </ItemInfo>
                </ListInfo>
              </DivInfo>
            )}
          </>
        )}
      {type === 'trash-film-for-series' ||
        (type === 'film-for-series' && (
          <DivVideoFilm>
            <VideoDetail>
              <iframe
                width="100%"
                height="400"
                title={data.filmSerialNumber}
                src={data.videoUrl.url}
                frameBorder="0"
                style={{ borderRadius: '20px' }}
                allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </VideoDetail>
          </DivVideoFilm>
        ))}
    </ModalDetail>
  );
}

export default memo(ModalDetailAssets);
