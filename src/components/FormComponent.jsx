import styles from "./FormCompo.module.css";

const FormComponent = ({
  formData = {},
  setFormData,
  elements = [],
  ButtonTitle = "Submit",
  error,
  handleSubmit,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

            default:
              return null;
          }
        })}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.submitButton}>
        <button
          type="button"
          className={styles.button}
          onClick={handleSubmit}
        >
          {ButtonTitle}
        </button>
      </div>
    </div>
  );
};

export default FormComponent;