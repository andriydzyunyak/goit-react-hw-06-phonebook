import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts, deleteContacts, filterContacts } from '../redux/store';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import {
  SectionContainer,
  FormTitle,
  ContactTitle,
} from 'components/Section.styled';

export const App = () => {
  const filter = useSelector(state => state.contacts.filter);
  const contacts = useSelector(state => state.contacts.items);
  console.log(contacts);
  const dispatch = useDispatch();

  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(localStorage.getItem('contacts')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const nameNormalized = name.toLowerCase();

    const uniqueName = contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized
    );

    if (uniqueName) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContacts([contact]));
      //setContacts([...contacts, contact]);
    }
  };

  // const deleteContact = contactId => {
  //   setContacts(contacts.filter(contact => contact.id !== contactId));
  // };

  const changeFilter = evt => {
    dispatch(filterContacts(evt.currentTarget.value));
  };

  const getFilteredContacts = () => {
    const filterNormalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  return (
    <SectionContainer>
      <FormTitle>Phonebook</FormTitle>
      {/* <ContactForm onSubmit={addContact} /> */}
      <ContactForm onSubmit={addContact} />
      <ContactTitle>Contacts</ContactTitle>
      <Filter value={filter} onChange={changeFilter} />
      {contacts && (
        <ContactList
          contacts={getFilteredContacts()}
          // onDeleteContact={deleteContact}
        />
      )}
    </SectionContainer>
  );
};
