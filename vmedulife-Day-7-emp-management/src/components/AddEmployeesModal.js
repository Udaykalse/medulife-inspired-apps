import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const FIELDS = [
  {
    name: "employeeId",
    label: "Employee ID",
    type: "text",
    placeholder: "e.g. EMP-001",
  },
  { name: "firstname", label: "First Name", type: "text", placeholder: "Jane" },
  { name: "lastname", label: "Last Name", type: "text", placeholder: "Doe" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jane@company.com",
  },
];

const AddEmployeesModal = ({
  showAdd,
  handleCloseAdd,
  handleOnChange,
  handleOnAdd,
  formState,
}) => {
  const firstRef = useRef(null);

  useEffect(() => {
    if (showAdd) setTimeout(() => firstRef.current?.focus(), 80);
  }, [showAdd]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleCloseAdd();
    };
    if (showAdd) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showAdd, handleCloseAdd]);

  if (!showAdd) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && handleCloseAdd()}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="addTitle"
      >
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle} id="addTitle">
              Add Employee
            </h2>
            <p className={styles.modalSubtitle}>
              Fill in the details below to register a new employee.
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleCloseAdd}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {FIELDS.map((field, i) => (
            <div className={styles.formGroup} key={field.name}>
              <label className={styles.label} htmlFor={`add-${field.name}`}>
                {field.label}
              </label>
              <input
                ref={i === 0 ? firstRef : null}
                id={`add-${field.name}`}
                className={styles.input}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formState?.[field.name] || ""}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={handleCloseAdd}>
            Cancel
          </button>
          <button className={styles.btnSubmit} onClick={handleOnAdd}>
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeesModal;
