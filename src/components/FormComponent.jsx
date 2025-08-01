import styles from "./FormCompo.module.css";
import { useEffect } from "react";

const FormComponent = ({
  formData = {},
  setFormData,
  elements = [],
  ButtonTitle = "Submit",
  error,
  handleSubmit,
  handleFileUpload
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: {
            file: file,        // Store the file object
            preview: reader.result, // Store the preview URL
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      elements.forEach(element => {
        if (element.fieldType === "ImageUpload" && formData[element.name]?.preview) {
          URL.revokeObjectURL(formData[element.name].preview);
        }
      });
    };
  }, [formData, elements]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGrid}>
        {elements.map((element) => {
          const value = formData[element.name] || "";

          switch (element.fieldType) {
            case "TitleSelect":
              return (
                <div key={element.key} className={styles.formField}>
                  <label className={styles.label}>
                    {element.label} <span className={styles.required}>*</span>
                  </label>
                  <select
                    className={styles.select}
                    name={element.name}
                    value={value}
                    onChange={handleInputChange}
                  >
                    {element.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );

            case "Inputs":
              return element.inputType === "textarea" ? (
                <div key={element.key} className={styles.formField}>
                  <label className={styles.label}>
                    {element.label} <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    name={element.name}
                    placeholder={element.placeholder}
                    value={value}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              ) : (
                <div key={element.key} className={styles.formField}>
                  <label className={styles.label}>
                    {element.label} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type={element.inputType}
                    className={styles.input}
                    name={element.name}
                    placeholder={element.placeholder}
                    value={value}
                    onChange={handleInputChange}
                  />
                </div>
              );

            case "ImageUpload":
              return (
                <div key={element.key} className={styles.formField}>
                  <label className={styles.label}>
                    {element.label} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    className={styles.fileInput}
                    name={element.name}
                    accept={element.accept || "image/*"}
                    onChange={handleImageChange}
                  />
                  {formData[element.name]?.file && (
                    <div className={styles.filePreview}>
                      <div className={styles.fileName}>
                        Selected: {formData[element.name].file.name}
                      </div>
                    </div>
                  )}
                </div>
              );

            case "FileUpload":
              return (
                <div key={element.key} className={styles.formField}>
                  <label className={styles.label}>
                    {element.label} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    className={styles.fileInput}
                    name={element.name}
                    accept={element.accept}
                    onChange={handleFileUpload}
                  />
                  {formData[element.name] && (
                    <div className={styles.fileName}>
                      Selected: {formData[element.name].name}
                    </div>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.submitButton}>
        <button type="button" className={styles.button} onClick={handleSubmit}>
          {ButtonTitle}
        </button>
      </div>
    </div>
  );
};

export default FormComponent;