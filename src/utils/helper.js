export const convertToFormData = obj => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      formData.append(`${key}`, element);
    }
  }
  return formData;
};
