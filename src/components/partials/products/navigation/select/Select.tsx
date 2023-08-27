

import { useAppDispatch } from '@/redux/hooks';
import { setSelectedValue } from '@/redux/state/togleSelect';
import React, { useState } from 'react';

const CustomSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionsVisible, setOptionsVisible] = useState<boolean>(false);

  const handleOptionClick = (optionValue: string): void => {
    setSelectedOption(optionValue);
    setOptionsVisible(false);
  };

  const dispatch = useAppDispatch();

  const handleButtonClick = (value: string) => {
    dispatch(setSelectedValue(value));
  };

  return (
    <div className="select">
      <div
        className="selected-option"
        onClick={() => setOptionsVisible(!isOptionsVisible)}
      >
        {selectedOption ? selectedOption : 'Choose by price'}
      </div>
      {isOptionsVisible && (
        <div className="options">
          <div
            className="option"
            onClick={() => (handleOptionClick('As prices rise'), handleButtonClick('up'))}
          >
            As prices rise
          </div>
          <div
            className="option"
            onClick={() => (handleOptionClick('As prices fall'), handleButtonClick('down'))}
          >
            As prices fall
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
