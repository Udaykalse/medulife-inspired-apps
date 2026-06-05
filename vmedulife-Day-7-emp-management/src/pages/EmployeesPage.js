import { useState, useMemo } from "react";
import EditEmployeesModal from "../components/EditEmployeesModal";
import AddEmployeesModal from "../components/AddEmployeesModal";
import styles from "./EmployeesPage.module.css";

const EmployeesPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [formState, setFormState] = useState({});
  const [selectedEmp, setSelectedEmp] = useState([]);
  const [selectedEmployeeForEdit, setSelectedEmployeeForEdit] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => {
    setShowAdd(false);
    setFormState({});
  };

  const handleShowEdit = () => {
    if (selectedEmp.length !== 1) {
      showToast("Please select exactly one employee to edit.", "error");
      return;
    }
    const selectedEmployee = Object.values(employeeDetails).find(
      (item) => item.employeeId === selectedEmp[0],
    );
    if (selectedEmployee) {
      setSelectedEmployeeForEdit(selectedEmployee);
      setShowEdit(true);
    }
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleOnChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnAdd = () => {
    const id = formState["employeeId"];
    if (
      !id ||
      !formState.firstname ||
      !formState.lastname ||
      !formState.email
    ) {
      showToast("Please fill in all fields.", "error");
      return;
    }
    if (employeeDetails[id]) {
      showToast("Employee ID already exists.", "error");
      return;
    }
    setEmployeeDetails((prev) => ({ ...prev, [id]: formState }));
    setFormState({});
    handleCloseAdd();
    showToast(
      `${formState.firstname} ${formState.lastname} added successfully.`,
    );
  };

  const handleUpdateData = (employee) => {
    const updatedId = employee["employeeId"];
    setEmployeeDetails((prev) => {
      const clone = { ...prev };
      Object.keys(clone).forEach((key) => {
        if (clone[key].employeeId === updatedId) clone[key] = employee;
      });
      return clone;
    });
    setSelectedEmp([]);
    handleCloseEdit();
    showToast("Employee updated successfully.");
  };

  const deleteHandler = () => {
    if (selectedEmp.length === 0) return;
    setEmployeeDetails((prev) => {
      const clone = { ...prev };
      selectedEmp.forEach((empId) => {
        delete clone[empId];
      });
      return clone;
    });
    const count = selectedEmp.length;
    setSelectedEmp([]);
    showToast(`${count} employee${count > 1 ? "s" : ""} deleted.`, "error");
  };

  const handleSelectAll = () => {
    const allKeys = Object.keys(employeeDetails);
    setSelectedEmp(selectedEmp.length === allKeys.length ? [] : allKeys);
  };

  const onCheckRow = (employeeId) => {
    setSelectedEmp((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSorted = useMemo(() => {
    let list = Object.values(employeeDetails);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.firstname?.toLowerCase().includes(q) ||
          e.lastname?.toLowerCase().includes(q) ||
          e.email?.toLowerCase().includes(q) ||
          e.employeeId?.toLowerCase().includes(q),
      );
    }
    if (sortConfig.key) {
      list = [...list].sort((a, b) => {
        const av = (a[sortConfig.key] || "").toString().toLowerCase();
        const bv = (b[sortConfig.key] || "").toString().toLowerCase();
        return sortConfig.direction === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      });
    }
    return list;
  }, [employeeDetails, searchQuery, sortConfig]);

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col)
      return <span className={styles.sortIcon}>↕</span>;
    return (
      <span className={`${styles.sortIcon} ${styles.sortActive}`}>
        {sortConfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const totalCount = Object.keys(employeeDetails).length;
  const selectedCount = selectedEmp.length;

  return (
    <div className={styles.page}>
      {toast && (
        <div className={`${styles.toast} ${styles[`toast--${toast.type}`]}`}>
          <span className={styles.toastIcon}>
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Employees</h1>
          <p className={styles.pageSubtitle}>
            {totalCount} total {totalCount === 1 ? "member" : "members"}
            {selectedCount > 0 && ` · ${selectedCount} selected`}
          </p>
        </div>
        <button className={styles.btnPrimary} onClick={handleShowAdd}>
          <span className={styles.btnIcon}>+</span> Add Employee
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search by name, email, or ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={styles.clearSearch}
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {selectedCount > 0 && (
            <div className={styles.bulkActions}>
              <span className={styles.bulkLabel}>{selectedCount} selected</span>
              <button
                className={`${styles.btnOutline} ${styles.btnEdit}`}
                onClick={handleShowEdit}
                disabled={selectedCount !== 1}
                title={selectedCount !== 1 ? "Select exactly one to edit" : ""}
              >
                ✎ Edit
              </button>
              <button
                className={`${styles.btnOutline} ${styles.btnDelete}`}
                onClick={deleteHandler}
              >
                ✕ Delete
              </button>
            </div>
          )}
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={totalCount > 0 && selectedCount === totalCount}
                      onChange={handleSelectAll}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </th>
                <th className={styles.th}>#</th>
                {[
                  { key: "employeeId", label: "Employee ID" },
                  { key: "firstname", label: "First Name" },
                  { key: "lastname", label: "Last Name" },
                  { key: "email", label: "Email" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className={`${styles.th} ${styles.thSortable}`}
                    onClick={() => handleSort(key)}
                  >
                    {label} <SortIcon col={key} />
                  </th>
                ))}
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    <div className={styles.emptyIcon}>👥</div>
                    <p className={styles.emptyTitle}>
                      {searchQuery ? "No results found" : "No employees yet"}
                    </p>
                    <p className={styles.emptyText}>
                      {searchQuery
                        ? "Try a different search term."
                        : 'Click "Add Employee" to get started.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAndSorted.map((emp, index) => {
                  const isSelected = selectedEmp.includes(emp.employeeId);
                  const initials =
                    `${(emp.firstname || "?")[0]}${(emp.lastname || "?")[0]}`.toUpperCase();
                  const avatarColors = [
                    "#6366f1",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                  ];
                  const color = avatarColors[index % avatarColors.length];
                  return (
                    <tr
                      key={emp.employeeId}
                      className={`${styles.tr} ${isSelected ? styles.trSelected : ""}`}
                      onClick={() => onCheckRow(emp.employeeId)}
                    >
                      <td className={styles.tdCheck}>
                        <label
                          className={styles.checkboxLabel}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={isSelected}
                            onChange={() => onCheckRow(emp.employeeId)}
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.rowNum}>{index + 1}</span>
                      </td>
                      <td className={styles.td}>
                        <code className={styles.idBadge}>{emp.employeeId}</code>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.nameCell}>
                          <div
                            className={styles.avatar}
                            style={{ background: color }}
                          >
                            {initials}
                          </div>
                          <span>{emp.firstname}</span>
                        </div>
                      </td>
                      <td className={styles.td}>{emp.lastname}</td>
                      <td className={styles.td}>
                        <a
                          className={styles.emailLink}
                          href={`mailto:${emp.email}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {emp.email}
                        </a>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.statusBadge}>Active</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalCount > 0 && (
          <div className={styles.tableFooter}>
            <span>
              Showing {filteredAndSorted.length} of {totalCount} employees
            </span>
          </div>
        )}
      </div>

      <AddEmployeesModal
        showAdd={showAdd}
        employeeDetails={employeeDetails}
        handleOnChange={handleOnChange}
        handleCloseAdd={handleCloseAdd}
        handleOnAdd={handleOnAdd}
        formState={formState}
      />

      <EditEmployeesModal
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        selectedEmployeeForEdit={selectedEmployeeForEdit}
        handleUpdateData={handleUpdateData}
      />
    </div>
  );
};

export default EmployeesPage;
