import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
// import { nanoid } from 'nanoid';
// import { useDispatch, useSelector } from 'react-redux';
import { useAddContacts } from 'redux/contactsSlice';
import {
  InputForm,
  LabelName,
  SubmitButton,
  PhonebookForm,
  ErrorText,
} from 'components/ContactForm/ContactForm.styled';

const initialState = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
});

export const ContactForm = () => {
  // const contacts = useSelector(getContacts);
  // const dispatch = useDispatch();

  // const handleSubmit = (values, { resetForm }) => {
  //   values.id = nanoid();
  //   const nameNormalized = values.name.toLowerCase();
  //   const uniqueName = contacts.find(
  //     contact => contact.name.toLowerCase() === nameNormalized
  //   );

  //   if (uniqueName) {
  //     alert(`${values.name} is already in contacts`);
  //   } else {
  //     dispatch(addContacts(values));
  //   }

  //   resetForm();
  // };
  const { contact } = useAddContacts();

  const handleSubmit = (values, { resetForm }) => {
    contact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <PhonebookForm autoComplete="off">
        <LabelName htmlFor="name">Name</LabelName>
        <InputForm
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorText name="name" component="div" />
        <LabelName htmlFor="number">Number</LabelName>
        <InputForm
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorText name="number" component="div" />
        <SubmitButton type="submit">Add contact</SubmitButton>
      </PhonebookForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
