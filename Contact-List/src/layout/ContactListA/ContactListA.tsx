import React from 'react';

interface ContactListProps {
  contacts: Contact[];
  mode: string;
  handleEdit: (contactId: number) => void;
  handleDelete: (contact: Contact) => void;
}

const ContactListA: React.FC<ContactListProps> = ({
  contacts,
  mode,
  handleEdit,
  handleDelete,
}) => {
  return (
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
  );
};

export default ContactListA;
