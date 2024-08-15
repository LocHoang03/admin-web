export const options = (max) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: max * 10,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };
  return options;
};

export const optionsPur = (max) => {
  const optionsPur = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#36A2EB',
        align: 'top',
        verticalAlign: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: max + 50,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };
  return optionsPur;
};

export const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '17%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
    width: '36%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  // {
  //   title: 'Phone Number',
  //   dataIndex: 'phoneNumber',
  //   key: 'phoneNumber',
  //   width: '20%',
  //   onCell: () => ({
  //     style: { fontWeight: '500' },
  //   }),
  // },
  {
    title: 'Gender',
    dataIndex: 'sex',
    key: 'sex',
    width: '10%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const columns2 = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Type Package',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  {
    title: 'Price',
    dataIndex: 'monthlyPrice',
    key: 'price',
    width: '25%',
    render: (text) => `$${text}`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
];

export const optionsSelect = [
  {
    value: 'day',
    label: 'Day',
  },
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'year',
    label: 'Year',
  },
];

export const tableDataPayment = {
  title5: {
    title: 'Price package(monthly)',
    dataIndex: 'monthlyPrice',
    key: 'monthlyPrice',
    width: '20%',
    render: (text) => `$${text}`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title4: {
    title: 'Type package',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '20%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title3: {
    title: 'Email address',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title2: {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title: {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableDataPackage = {
  title2: {
    title: 'Monthly price',
    dataIndex: 'monthlyPrice',
    key: 'monthlyPrice',
    width: '60%',
    render: (text) => `$${text}`,
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title: {
    title: 'Type package',
    dataIndex: 'typePack',
    key: 'typePack',
    width: '20%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableCommonQuestions = {
  title: {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: '70%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};

export const tableCustomerQuestions = {
  title4: {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title3: {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '30%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title2: {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
  title: {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '15%',
    onCell: () => ({
      style: { fontWeight: '500' },
    }),
  },
};
