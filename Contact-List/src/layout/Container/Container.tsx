import React, { useState } from 'react';
import DeleteConfirmationModal from '../../components/Modal/Modal';
import ContactForm from '../ContactForm/ContactForm';
import Header from '../Header/Header';
import ContactList from '../ContactListA/ContactListA';
import { handleSubmit } from '../../functions/HandleSubmit/HandleSubmit';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relation: string;
  email: string;
}

const Container: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Contact>({
    id: 1,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relation: '',
    email: '',
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [mode, setMode] = useState('light');

  const handleEdit = (contactId: number) => {
    const contactToEdit = contacts.find((contact) => contact.id === contactId);
    if (contactToEdit) {
      setFormData(contactToEdit);
      setEditingContactId(contactId);
    }
  };

  const handleDelete = (contact: Contact) => {
    setContactToDelete(contact);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactToDelete.id)
      );
    }
    setContactToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setContactToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relation: '',
    email: '',
  });
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      relation: '',
      email: '',
    };

    if (!formData.firstName) {
      isValid = false;
      errors.firstName = 'لطفا نام را وارد کنید';
    }

    if (!formData.lastName) {
      isValid = false;
      errors.lastName = 'لطفا نام خانوادگی را وارد کنید';
    }

    if (!formData.phoneNumber) {
      isValid = false;
      errors.phoneNumber = 'لطفا شماره موبایل را وارد کنید';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      isValid = false;
      errors.phoneNumber = 'لطفا شماره موبایل را به صورت صحیح وارد کنید';
    }

    if (!formData.relation) {
      isValid = false;
      errors.relation = 'لطفا نسبت خود را انتخاب کنید';
    }

    if (!formData.email) {
      isValid = false;
      errors.email = 'لطفا ایمیل خود را وارد کنید';
    } else if (!validateEmail(formData.email)) {
      isValid = false;
      errors.email = 'لطفا ایمیل را به صورت صحیح وارد کنید';
    }

    setFormErrors(errors);
    return isValid;
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      e,
      validateForm,
      formData,
      editingContactId,
      setContacts,
      setEditingContactId,
      contacts,
      setFormData,
    });
  };
  return (
    <div
      className={`mx-auto px-4 ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
    >
      <Header setMode={setMode} mode={mode} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactForm
          formData={formData}
          formErrors={formErrors}
          mode={mode}
          handleChange={handleChange}
          handleSubmit={handleFormSubmit} // Pass the new
          contacts={contacts}
          validateForm={validateForm}
          editingContactId={editingContactId}
        />
        <ContactList
          contacts={contacts}
          mode={mode}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <div>
          <DeleteConfirmationModal
            showDeleteConfirmation={showDeleteConfirmation}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
