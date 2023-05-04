// ContactForm.tsx
import React from 'react';
import { toast } from 'react-toastify';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relation: string;
  email: string;
}
interface ContactFormProps {
  formData: Contact;
  formErrors: any;
  mode: string;
  contacts: [];
  isFormValid: boolean;
  validateForm: () => boolean;
  editingContactId: number | null;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  emailError: string;
  relationError: string;
  phoneNumberError: string;
  lastNameError: string;
  firstNameError: string;
  validateEmail: () => void;
  validateFirstName: () => void;
  validateLastName: () => void;
  validateRelation: () => void;
  validatePhoneNumber: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  mode,
  handleChange,
  handleSubmit,
  contacts,
  isFormValid,
  validateForm,
  editingContactId,
  emailError,
  relationError,
  phoneNumberError,
  lastNameError,
  firstNameError,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateRelation,
  validatePhoneNumber,
}) => {
  // const isFormValid = validateForm();
  return (
    <div className="mb-4">
      <h2 className="text-2xl text-center font-bold mb-2 drop-shadow-md">
        اضافه / ویرایش کاربران
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`bg-white shadow-md drop-shadow-md rounded px-8 pt-3 ${
          mode == 'dark' ? 'bg-dark text-white' : 'bg-gray-100 text-gray-700'
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
            onKeyUp={validateFirstName}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
            placeholder="نام ... "
          />
          <span className="text-red-500 text-sm">{firstNameError}</span>
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
            onKeyUp={validateLastName}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
            placeholder="نام خانوادگی ... "
          />
          <span className="text-red-500 text-sm">{lastNameError}</span>
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
            onKeyUp={validatePhoneNumber}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
            placeholder="شماره موبایل  ... "
          />
          <span className="text-red-500 text-sm">{phoneNumberError}</span>
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
            onClick={validateRelation}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
          >
            <option value="">نسبت</option>
            <option value="اعضای خانواده">اعضای خانواده</option>
            <option value="دوست">دوست</option>
            <option value="همکار">همکار</option>
            <option value="فامیل">فامیل</option>
          </select>
          <span className="text-red-500 text-sm">{relationError}</span>
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
            onKeyUp={() => {
              validateEmail();
              validateForm();
            }}
            value={formData.email}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline drop-shadow-md"
            placeholder="ایمیل ... "
          />
          <span className="text-red-500 text-sm">{emailError}</span>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`${
            !isFormValid ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3 shadow-md drop-shadow-md`}
          onClick={() => {
            const isContactExists = contacts.some(
              (contact) =>
                contact.firstName === formData.firstName &&
                contact.lastName === formData.lastName
            );
            if (
              validateForm() &&
              editingContactId == null &&
              !isContactExists
            ) {
              toast.success(
                `کاربر ${formData.firstName} ${formData.lastName} با موفقیت اضافه شد`,
                { className: 'text-xl text-right' }
              );
            } else if (!validateForm()) {
              toast.error(`افزودن کاربر با خطا روبرو شد`, {
                className: 'text-xl text-right',
              });
            } else {
              if (!isContactExists) {
                toast.success(`ویرایش کاربر با موفقیت انجام شد`, {
                  className: 'text-xl text-right',
                });
              }
            }
            return !isFormValid;
          }}
        >
          {editingContactId ? 'ویرایش' : 'اضافه کردن'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
