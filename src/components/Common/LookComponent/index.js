import { Input, Select } from 'antd';
import { memo } from 'react';
import { DivLook, BtnLook } from './styles';

function LookInfo(props) {
  return (
    props.type !== 'film-for-series' &&
    props.type !== 'trash-film-for-series' &&
    (props.type !== 'user' &&
    props.type !== 'subscriber' &&
    props.type !== 'banned-subscriber' ? (
      <DivLook>
        {props.type === 'payment' && (
          <Input
            placeholder={'Search by first name'}
            allowClear
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
          />
        )}
        <Input
          placeholder={
            props.type === 'category'
              ? 'Search by category name'
              : props.type === 'movies' || props.type === 'trash-movies'
              ? 'Search by movie name'
              : props.type === 'series' || props.type === 'trash-series'
              ? 'Search by series name'
              : props.type === 'payment'
              ? 'Search by last name'
              : 'Search by  name package'
          }
          allowClear
          value={props.textLook}
          onChange={(e) => props.setTextLook(e.target.value)}
        />
        {props.type !== 'category' && props.type !== 'subscription-price' && (
          <Select
            showSearch
            defaultValue={'All'}
            value={
              props.valueCountries ? props.valueCountries : props.valuePackage
            }
            placeholder={
              props.type !== 'payment' && props.type !== 'subscription-price'
                ? 'Select a country'
                : 'Select a package'
            }
            optionFilterProp="children"
            onChange={(value) => {
              if (
                props.type !== 'payment' &&
                props.type !== 'subscription-price'
              ) {
                props.setValueCountries(value);
              } else {
                props.setValuePackage(value);
              }
            }}
            filterOption={props.filterOption}
            options={
              props.dataCountries ? props.dataCountries : props.dataPayment
            }
          />
        )}
        <BtnLook onClick={() => props.onChangeLook()}>Search</BtnLook>
      </DivLook>
    ) : (
      <>
        <DivLook>
          <Input
            placeholder={'Search by first name'}
            allowClear
            value={props.textFirstName}
            onChange={(e) => props.setTextFirstName(e.target.value)}
          />
          <Input
            placeholder={'Search by last name'}
            allowClear
            value={props.textLastName}
            onChange={(e) => props.setTextLastName(e.target.value)}
          />
          <Select
            className="select-email"
            showSearch
            defaultValue={'All'}
            value={props.valueEmail}
            placeholder={'Select a email'}
            optionFilterProp="children"
            onChange={(value) => {
              props.setValueEmail(value);
            }}
            filterOption={props.filterOption}
            options={props?.dataEmail}
          />
          <Select
            defaultValue={'All'}
            value={props.valueGender}
            placeholder={'Select a gender'}
            onChange={(value) => {
              props.setValueGender(value);
            }}
            options={[
              { label: 'All', value: 'All' },
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
          <BtnLook onClick={() => props.onChangeLook()}>Search</BtnLook>
        </DivLook>
      </>
    ))
  );
}

export default memo(LookInfo);
