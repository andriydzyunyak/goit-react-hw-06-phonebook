import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { ContactBook } from 'components/ContactList/ContactList.styled';
import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/store';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  return (
    <ContactBook>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={() => dispatch(deleteContacts(id))}
        />
      ))}
    </ContactBook>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
