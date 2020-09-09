import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { SelectContainer, DefaultValue, SelectOptionsContainer, ListOption, Option } from './styled';

const SelectComponent = ({ defaultValue, options, type, changeHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  }

  const setSelected = (index) => {
    setSelectedIndex(index);
  }

  let renderOptions = options;

  if (type === 'monthSelect') {
    const currentMonth = new Date().getMonth();
    renderOptions = options.filter((option, index) => index <= currentMonth);
  }

  useEffect(() => {
    if (type === 'monthSelect') {
      const currentMonth = new Date().getMonth();
      setSelectedIndex(currentMonth);
    }
  }, [type]);

  return (
    <SelectContainer>
      <DefaultValue onClick={toggleSelect} type="button">{defaultValue}</DefaultValue>
      <SelectOptionsContainer isOpen={isOpen}>
        {
          renderOptions.map((option, index) => (
            <ListOption key={option}>
              <Option
                onClick={(e) => {changeHandler(e); toggleSelect(); setSelected(index)}}
                type="button"
                className={index === selectedIndex ? 'selected' : null}
              >
                {option}
              </Option>
            </ListOption>
          ))
        }
      </SelectOptionsContainer>
    </SelectContainer>
  )
}

SelectComponent.defaultProps = {
  type: '',
}

SelectComponent.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
}

export default SelectComponent;
