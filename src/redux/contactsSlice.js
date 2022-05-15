import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

//Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '' },
  reducers: {
    addContacts: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContacts: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
  },
});

//Config Storage
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContacts, deleteContacts, filterContacts } =
  contactsSlice.actions;

//Selectors
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

//Hooks
export const useAddContacts = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const addContact = values => {
    values.id = nanoid();
    const nameNormalized = values.name.toLowerCase();
    const uniqueName = contacts.find(
      contact => contact.name.toLowerCase() === nameNormalized
    );

    if (uniqueName) {
      alert(`${values.name} is already in contacts`);
    } else {
      dispatch(addContacts(values));
    }
  };

  return { contact: addContact };
};

// export const useAddContacts = () => {
//   const contacts = useSelector(getContacts);
//   const dispatch = useDispatch();

//   const handleSubmit = (values, { resetForm }) => {
//     values.id = nanoid();
//     const nameNormalized = values.name.toLowerCase();
//     const uniqueName = contacts.find(
//       contact => contact.name.toLowerCase() === nameNormalized
//     );

//     if (uniqueName) {
//       alert(`${values.name} is already in contacts`);
//     } else {
//       dispatch(addContacts(values));
//     }

//     resetForm();
//   };
//   return { submitForm: handleSubmit };
// };
