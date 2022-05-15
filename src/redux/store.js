import { configureStore, createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [{ id: '', name: '', number: '' }], filter: '' },
  reducers: {
    addContacts: (state, action) => {
      //state.items = action.payload;
      state.items.push(action.payload);
    },
    deleteContacts: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
      // const filterNormalized = state.toLowerCase();
      // return state.filter(contact =>
      //   contact.items.name.toLowerCase().includes(filterNormalized)
      // );
    },
  },
});

export const { addContacts, deleteContacts, filterContacts } =
  contactsSlice.actions;

console.log(contactsSlice);

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});
