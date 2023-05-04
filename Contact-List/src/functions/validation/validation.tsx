// export const validatePhoneNumber = ({ formData, setPhoneNumberError }) => {
//   const phoneRegex = /^\d{11}$/;
//   let isValid;
//   const errors = {
//     phoneNumber: '',
//   };
//   if (!formData.phoneNumber) {
//     isValid = false;
//     errors.phoneNumber = 'لطفا شماره موبایل را وارد کنید';
//     setPhoneNumberError(errors.phoneNumber);
//   } else if (!phoneRegex.test(formData.phoneNumber)) {
//     isValid = false;
//     errors.phoneNumber = 'لطفا شماره موبایل را به صورت صحیح وارد کنید';
//     setPhoneNumberError(errors.phoneNumber);
//   } else {
//     isValid = true;
//     setPhoneNumberError(errors.phoneNumber);
//   }
//   return isValid;
// };

// export const validateEmail = ({ formData }) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   let isValid;
//   const errors = {
//     email: '',
//   };
//   if (!formData.email) {
//     isValid = false;
//     errors.email = 'لطفا ایمیل خود را وارد کنید';
//     setEmailError(errors.email);
//   } else if (!emailRegex.test(formData.email)) {
//     // Corrected condition
//     isValid = false;
//     errors.email = 'لطفا ایمیل را به صورت صحیح وارد کنید';
//     setEmailError(errors.email);
//   } else {
//     isValid = true;
//     setEmailError(errors.email);
//   }
//   return isValid;
// };

// export const validateFirstName = () => {
//   let isValid;
//   const errors = {
//     firstName: '',
//   };
//   if (!formData.firstName) {
//     isValid = false;
//     errors.firstName = 'لطفا نام را وارد کنید';
//     setFirstNameError(errors.firstName);
//     setLastNameError('');
//   } else if (formData.firstName.length < 3) {
//     isValid = false;
//     errors.firstName = 'لطفا نام را به صورت صحیح وارد کنید';
//     setFirstNameError(errors.firstName);
//   } else {
//     isValid = true;
//     setFirstNameError(errors.firstName);
//   }
//   return isValid;
// };
// export const validateLastName = () => {
//   let isValid;
//   const errors = {
//     lastName: '',
//   };
//   if (!formData.lastName) {
//     isValid = false;
//     errors.lastName = 'لطفا نام خانوادگی را وارد کنید';
//     setLastNameError(errors.lastName);
//   } else {
//     isValid = true;
//     setLastNameError(errors.lastName);
//   }
//   return isValid;
// };
// export const validateRelation = () => {
//   let isValid;
//   const errors = {
//     relation: '',
//   };
//   if (!formData.relation) {
//     isValid = false;
//     errors.relation = 'لطفا نسبت خود را انتخاب کنید';
//     setRelationError(errors.relation);
//   } else {
//     isValid = true;
//     setRelationError(errors.relation);
//   }
//   return isValid;
// };
