import React, { useState } from 'react';
import Modal from 'react-modal';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relation: string;
  email: string;
}

const ContactList: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [mode, setMode] = useState('light');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.relation ||
      !formData.email
    ) {
      return; // Don't submit if any required field is empty
    }
    if (editingContactId) {
      // Editing an existing contact
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === editingContactId
            ? { ...formData, id: contact.id }
            : contact
        )
      );
      setEditingContactId(null);
    } else {
      // Adding a new contact
      setContacts((prevContacts) => [
        ...prevContacts,
        { ...formData, id: Date.now() },
      ]);
    }

    // Clear the form data
    setFormData({
      id: 1,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      relation: '',
      email: '',
    });
  };

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

  return (
    <div
      className={`mx-auto px-4 ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
    >
      <div className="text-xl md:text-3xl font-bold text-center mb-3 text-white bg-[url(./src/assets/img/header.jpg)] bg-cover bg-center relative rounded-b-full top-0 p-2 drop-shadow-md">
        <p className="drop-shadow-md">وب اپلیکیشن مدیریت مخاطبین</p>
        <button
          className="absolute left-10 text-sm top-2 bg-white rounded-full p-1"
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
          {mode === 'dark' ? (
            <img src="./src/assets/img/moon.svg" alt="aa" />
          ) : (
            <img src="./src/assets/img/sun.svg" alt="aa" />
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h2 className="text-2xl text-center font-bold mb-2 drop-shadow-md">
            اضافه / ویرایش کاربران
          </h2>
          <form
            onSubmit={handleSubmit}
            className={`bg-white shadow-md drop-shadow-md rounded px-8 pt-3 ${
              mode == 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <div className="mb-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-bold mb-2 drop-shadow-md"
              >
                نام:
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
                placeholder="نام ... "
              />
              <span className="text-red-500 text-sm">
                {formErrors.firstName}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-bold mb-2 drop-shadow-md"
              >
                نام خانوادگی:
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
                placeholder="نام خانوادگی ... "
              />
              <span className="text-red-500 text-sm">
                {formErrors.lastName}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-bold mb-2 drop-shadow-md"
              >
                شماره موبایل:
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
                placeholder="شماره موبایل  ... "
              />
              <span className="text-red-500 text-sm">
                {formErrors.phoneNumber}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="relation"
                className="block text-sm font-bold mb-2 drop-shadow-md"
              >
                نسبت:
              </label>
              <select
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
              >
                <option value="">نسبت</option>
                <option value="اعضای خانواده">اعضای خانواده</option>
                <option value="دوست">دوست</option>
                <option value="همکار">همکار</option>
                <option value="فامیل">فامیل</option>
              </select>
              <span className="text-red-500 text-sm">
                {formErrors.relation}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2 drop-shadow-md"
              >
                ایمیل:
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
                placeholder="ایمیل ... "
              />
              <span className="text-red-500 text-sm">{formErrors.email}</span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3 shadow-md drop-shadow-md"
            >
              {editingContactId ? 'ویرایش' : 'اضافه کردن'}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl text-center font-bold mb-2 drop-shadow-md">
            لیست کاربران
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md drop-shadow-md rounded-md h-[454px] overflow-y-scroll ${
              mode == 'dark'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={` ${
                  mode == 'dark'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                } rounded px-8 pt-6 pb-4 flex flex-col justify-between h-[200px] m-2 shadow-md drop-shadow-md`}
              >
                <div>
                  <p className="drop-shadow-md">
                    <strong>نام:</strong> {contact.firstName} {contact.lastName}
                  </p>
                  <p className="drop-shadow-md">
                    <strong>شماره موبایل:</strong> {contact.phoneNumber}
                  </p>
                  <p className="drop-shadow-md">
                    <strong>نسبت:</strong> {contact.relation}
                  </p>
                  <p className="drop-shadow-md">
                    <strong>ایمیل:</strong> {contact.email}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleEdit(contact.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline mr-2 shadow-md drop-shadow-md"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(contact)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l-md focus:outline-none focus:shadow-outline shadow-md drop-shadow-md"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Modal
            isOpen={showDeleteConfirmation}
            onRequestClose={cancelDelete}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="text-center rounded-full bg-gray-400 p-10">
              <p className="mb-4 text-xl">
                آیا از حذف این مخاطب اطمینان دارید؟
              </p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={confirmDelete}
              >
                بله
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={cancelDelete}
              >
                خیر
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
