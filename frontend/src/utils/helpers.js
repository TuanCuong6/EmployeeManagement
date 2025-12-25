// Helper functions for date formatting, validation, etc.

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const calculateAge = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBirthDate = (dateString) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 18 && age <= 100;
};

export const generateEmployeeCode = () => {
  return `NV${Date.now().toString().slice(-6)}`;
};
