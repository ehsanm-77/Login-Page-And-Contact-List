import { toast } from 'react-toastify';

export const handleSubmit = ({
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
}: any) => {
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
    return;
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
    const isContactExists = contacts.some(
      (contact) =>
        contact.firstName === formData.firstName &&
        contact.lastName === formData.lastName
    );
    if (isContactExists) {
      // Contact with the same name already exists
      toast.error('کاربر با اسم مشابه وجود دارد', {
        className: 'text-xl text-right',
      });
      return;
    }

    setContacts((prevContacts) => [
      ...prevContacts,
      { ...formData, id: Date.now() },
    ]);
  }

  setFormData({
    id: 1,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relation: '',
    email: '',
  });
  setIsFormValid(false);
};
