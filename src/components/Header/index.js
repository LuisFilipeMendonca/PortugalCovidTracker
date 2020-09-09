import React from 'react';
import PropTypes from 'prop-types';

import { Header, HeaderTitle, Label, InputCheckbox, ThemeToggler } from './styled';

const HeaderComponent = ({ themeToggler }) => (
  <Header>
    <HeaderTitle>Covid Tracker</HeaderTitle>
    <Label htmlFor="themeToggler">
      <InputCheckbox type="checkbox" id="themeToggler" onChange={themeToggler} />
      <ThemeToggler />
    </Label>
  </Header>
);

HeaderComponent.propTypes = {
  themeToggler: PropTypes.func.isRequired,
}

export default HeaderComponent;
