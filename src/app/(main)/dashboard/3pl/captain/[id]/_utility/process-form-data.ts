export async function processFormData(data: any, isEdit: boolean) {
  const formData = new FormData();

  const singleFileFields = ["iqama", "licence", "upload_agreement_copy"];
  const arrayFileFields = ["vehicle_images"];
  const allFileFields = [...singleFileFields, ...arrayFileFields];

  // Append non-file fields
  Object.keys(data).forEach((key) => {
    if (allFileFields.includes(key)) return;

    if (
      isEdit &&
      (key === "password" || key === "password_confirmation") &&
      // eslint-disable-next-line security/detect-object-injection
      !data[key]
    ) {
      return;
    }

    // eslint-disable-next-line security/detect-object-injection
    if (data[key] !== undefined && data[key] !== null) {
      // eslint-disable-next-line security/detect-object-injection
      formData.append(key, String(data[key]));
    }
  });

  // Append single file fields
  singleFileFields.forEach((field) => {
    // eslint-disable-next-line security/detect-object-injection
    if (data[field] && data[field].length > 0) {
      // FileList from input - take the first file
      // eslint-disable-next-line security/detect-object-injection
      formData.append(field, data[field][0]);
    }
  });

  // Append array file fields
  arrayFileFields.forEach((field) => {
    // eslint-disable-next-line security/detect-object-injection
    if (data[field] && Array.isArray(data[field]) && data[field].length > 0) {
      // For array fields like vehicle_images, append with [] suffix
      // eslint-disable-next-line security/detect-object-injection
      data[field].forEach((file: File) => {
        formData.append(`${field}[]`, file);
      });
    }
  });

  return formData;
}
