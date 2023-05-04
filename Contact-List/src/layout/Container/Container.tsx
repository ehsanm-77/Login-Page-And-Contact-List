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
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
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

  // const [formErrors, setFormErrors] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   relation: '',
  //   email: '',
  // });
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [relationError, setRelationError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{11}$/;
    let isValid;
    const errors = {
      phoneNumber: '',
    };
    if (!formData.phoneNumber) {
      isValid = false;
      errors.phoneNumber = 'لطفا شماره موبایل را وارد کنید';
      setPhoneNumberError(errors.phoneNumber);
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      isValid = false;
      errors.phoneNumber = 'لطفا شماره موبایل را به صورت صحیح وارد کنید';
      setPhoneNumberError(errors.phoneNumber);
    } else {
      isValid = true;
      setPhoneNumberError(errors.phoneNumber);
    }
    return isValid;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid;
    const errors = {
      email: '',
    };
    if (!formData.email) {
      isValid = false;
      errors.email = 'لطفا ایمیل خود را وارد کنید';
      setEmailError(errors.email);
    } else if (!emailRegex.test(formData.email)) {
      // Corrected condition
      isValid = false;
      errors.email = 'لطفا ایمیل را به صورت صحیح وارد کنید';
      setEmailError(errors.email);
    } else {
      isValid = true;
      setEmailError(errors.email);
    }
    return isValid;
  };

  const validateFirstName = () => {
    let isValid;
    const errors = {
      firstName: '',
    };
    if (!formData.firstName) {
      isValid = false;
      errors.firstName = 'لطفا نام را وارد کنید';
      setFirstNameError(errors.firstName);
      setLastNameError('');
    } else if (formData.firstName.length < 3) {
      isValid = false;
      errors.firstName = 'لطفا نام را به صورت صحیح وارد کنید';
      setFirstNameError(errors.firstName);
    } else {
      isValid = true;
      setFirstNameError(errors.firstName);
    }
    return isValid;
  };
  const validateLastName = () => {
    let isValid;
    const errors = {
      lastName: '',
    };
    if (!formData.lastName) {
      isValid = false;
      errors.lastName = 'لطفا نام خانوادگی را وارد کنید';
      setLastNameError(errors.lastName);
    } else {
      isValid = true;
      setLastNameError(errors.lastName);
    }
    return isValid;
  };
  const validateRelation = () => {
    let isValid;
    const errors = {
      relation: '',
    };
    if (!formData.relation) {
      isValid = false;
      errors.relation = 'لطفا نسبت خود را انتخاب کنید';
      setRelationError(errors.relation);
    } else {
      isValid = true;
      setRelationError(errors.relation);
    }
    return isValid;
  };
  const validateForm = () => {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();
    const isRelationValid = validateRelation();

    const isValid =
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneNumberValid &&
      isRelationValid;

    setIsFormValid(isValid); // Update the isFormValid state with the validation result
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
      isFormValid,
      setIsFormValid,
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
          // formErrors={formErrors}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          phoneNumberError={phoneNumberError}
          relationError={relationError}
          emailError={emailError}
          mode={mode}
          handleChange={handleChange}
          handleSubmit={handleFormSubmit} // Pass the new
          contacts={contacts}
          validateForm={validateForm}
          validateFirstName={validateFirstName}
          validateLastName={validateLastName}
          validatePhoneNumber={validatePhoneNumber}
          validateRelation={validateRelation}
          validateEmail={validateEmail}
          isFormValid={isFormValid}
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
