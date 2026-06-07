import { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const FIELDS = [
  { name: "employeeId", label: "Employee ID", type: "text", disabled: true },
  { name: "firstname", label: "First Name", type: "text" },
  { name: "lastname", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
];

const EditEmployeesModal = ({
  showEdit,
  handleCloseEdit,
  selectedEmployeeForEdit,
  handleUpdateData,
}) => {
  const [localState, setLocalState] = useState({});
  const firstRef = useRef(null);

  useEffect(() => {
    if (showEdit) {
      setLocalState({ ...selectedEmployeeForEdit });
      setTimeout(() => firstRef.current?.focus(), 80);
    }
  }, [showEdit, selectedEmployeeForEdit]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleCloseEdit();
    };
    if (showEdit) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showEdit, handleCloseEdit]);

  const handleChange = (e) => {
    setLocalState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!showEdit) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && handleCloseEdit()}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editTitle"
      >
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle} id="editTitle">
              Edit Employee
            </h2>
            <p className={styles.modalSubtitle}>
              Update the details for{" "}
              <strong>
                {localState.firstname} {localState.lastname}
              </strong>
              .
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleCloseEdit}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {FIELDS.map((field, i) => (
            <div className={styles.formGroup} key={field.name}>
              <label className={styles.label} htmlFor={`edit-${field.name}`}>
                {field.label}
                {field.disabled && (
                  <span className={styles.readonlyTag}>read-only</span>
                )}
              </label>
              <input
                ref={i === 1 ? firstRef : null}
                id={`edit-${field.name}`}
                className={`${styles.input} ${field.disabled ? styles.inputDisabled : ""}`}
                type={field.type}
                name={field.name}
                value={localState[field.name] || ""}
                onChange={handleChange}
                disabled={field.disabled}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={handleCloseEdit}>
            Cancel
          </button>
          <button
            className={styles.btnSubmit}
            onClick={() => handleUpdateData(localState)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeesModal;
