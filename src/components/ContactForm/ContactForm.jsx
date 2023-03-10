import { useState } from 'react';
import clsx from 'clsx';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contact.slice';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleNameChange = event => {
    const { value, name } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmitBtn = evt => {
    evt.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      return window.alert(`${name} is already in contacts.`);
    }

    dispatch(addContacts(name, number));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={clsx(css.formWrapper)} onSubmit={handleSubmitBtn}>
      <label className={clsx(css.nameThumb)}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={clsx(css.numberThumb)}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNameChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={clsx(css.submitButton)} type="submit">
        Add contact
      </button>
    </form>
  );
};
