import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../redux/store';
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

  const changeFilter = evt => {
    evt.preventDefault();
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
      <ContactForm />
      <ContactTitle>Contacts</ContactTitle>
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={changeFilter} />
      )}
      {contacts.length !== 0 ? (
        <ContactList contacts={getFilteredContacts()} />
      ) : (
        <div>There is no contact.</div>
      )}
    </SectionContainer>
  );
};
