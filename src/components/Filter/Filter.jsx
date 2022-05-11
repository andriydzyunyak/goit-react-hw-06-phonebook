import PropTypes from 'prop-types';
import {
  FilterContainer,
  FilterLabel,
  FilterInput,
} from 'components/Filter/Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <FilterContainer>
      <FilterLabel>
        Find contacts by name
        <FilterInput
          type="text"
          value={value}
          onChange={onChange}
        ></FilterInput>
      </FilterLabel>
    </FilterContainer>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
