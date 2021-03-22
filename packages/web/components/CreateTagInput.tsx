import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import customStyles from 'utils/reactSelectStyles';

const components = {
  DropdownIndicator: null,
};
const createOption = (label: string) => ({
  label,
  value: label,
});

export interface CreatableSelectValue {
  value: string;
  label: string;
}

interface Props {
  onTagCreate: (tags: Array<CreatableSelectValue>) => void;
}

export default function CreateTagInput({ onTagCreate }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([]);
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab': {
        const values = [...value, createOption(inputValue)];
        setValue(values);
        setInputValue('');
        onTagCreate(values);
        event.preventDefault();
        break;
      }
      default:
    }
  };
  const onChange = (newValue) => {
    setValue(newValue);
    onTagCreate(newValue);
  };
  return (
    <CreatableSelect
      isMulti
      isClearable
      components={components}
      onInputChange={(newValue) => setInputValue(newValue)}
      inputValue={inputValue}
      menuIsOpen={false}
      value={value}
      onChange={onChange}
      placeholder="Create tags"
      options={[]}
      onKeyDown={handleKeyDown}
      styles={customStyles}
    />
  );
}
