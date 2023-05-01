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
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center mb-10 text-blue-700">
        وب اپلیکیشن مدیریت مخاطبین
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">اضافه / ویرایش کاربران</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              نام:
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="نام ... "
            />
            <span className="text-red-500 text-sm">{formErrors.firstName}</span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              نام خانوادگی:
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="نام خانوادگی ... "
            />
            <span className="text-red-500 text-sm">{formErrors.lastName}</span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              شماره موبایل:
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="شماره موبایل  ... "
            />
            <span className="text-red-500 text-sm">
              {formErrors.phoneNumber}
            </span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="relation"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              نسبت:
            </label>
            <select
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">نسبت</option>
              <option value="اعضای خانواده">اعضای خانواده</option>
              <option value="دوست">دوست</option>
              <option value="همکار">همکار</option>
              <option value="فامیل">فامیل</option>
            </select>
            <span className="text-red-500 text-sm">{formErrors.relation}</span>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ایمیل:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ایمیل ... "
            />
            <span className="text-red-500 text-sm">{formErrors.email}</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingContactId ? 'ویرایش' : 'اضافه کردن'}
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">لیست کاربران</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow rounded px-8 pt-6 pb-4"
            >
              <p>
                <strong>نام:</strong> {contact.firstName} {contact.lastName}
              </p>
              <p>
                <strong>شماره موبایل:</strong> {contact.phoneNumber}
              </p>
              <p>
                <strong>نسبت:</strong> {contact.relation}
              </p>
              <p>
                <strong>ایمیل:</strong> {contact.email}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleEdit(contact.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(contact)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={showDeleteConfirmation}
        onRequestClose={cancelDelete}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="text-center">
          <p className="mb-4">آیا از حذف این مخاطب اطمینان دارید؟</p>
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
  );
};

export default ContactList;
