import { useSelector, useDispatch } from 'react-redux';
import { filterContacts, getFilter, getContacts } from 'redux/contactsSlice';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import {
  SectionContainer,
  FormTitle,
  ContactTitle,
} from 'components/Section.styled';

export const App = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const changeFilter = evt => {
    dispatch(filterContacts(evt.currentTarget.value));
  };

  const filteredContacts = () => {
    const filterNormalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  return (
    <SectionContainer>
      <FormTitle>Phonebook</FormTitle>
      <ContactForm />
      <ContactTitle>Contacts</ContactTitle>
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={changeFilter} />
      )}
      {contacts.length !== 0 ? (
        <ContactList contacts={filteredContacts()} />
      ) : (
        <div>There is no contact.</div>
      )}
    </SectionContainer>
  );
};
