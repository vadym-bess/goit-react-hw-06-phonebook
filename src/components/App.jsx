import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contact.slice';
import { searchAction } from 'redux/filter.slice';
import { deleteContacts } from 'redux/contact.slice';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);

  const dispatch = useDispatch();

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      return window.alert(`${name} is already in contacts.`);
    }
    dispatch(addContacts(name, number));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContacts(id));
  };

  const changeFilter = e => {
    dispatch(searchAction(e.currentTarget.value));
  };

  const normalizeFilter = filter.toLowerCase();

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normalizeFilter);
  });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts} onClick={handleDeleteContact} />
    </>
  );
};
