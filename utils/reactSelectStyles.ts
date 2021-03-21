const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '0.25em 0',
    border: 'none',
    backgroundColor: '#e0e7ff',
    cursor: 'pointer',
    boxShadow: state.isFocused ? '0 0 0 2px #93c5fd' : null,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#2563eb',
    color: 'white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  }),
};

export default customStyles;
