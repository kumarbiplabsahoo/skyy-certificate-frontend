import { motion } from "framer-motion";
import styles from "../../assets/styles/ui/TableData.module.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ columns = [], data = [], actions = {} }) => {
  const hasActions = Object.keys(actions).some((key) => key !== "add");

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.tableContainer}
    >
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            {columns.map((col, i) => (
              <th key={i} className={styles.th}>
                {col.toUpperCase()}
              </th>
            ))}
            {hasActions && <th className={styles.th}>ACTIONS</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr className={styles.tr}>
              <td
                className={styles.td}
                colSpan={columns.length + (hasActions ? 1 : 0)}
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#999",
                }}
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((col, i) => (
                  <td key={i} className={styles.td}>
                    {row[col]}
                  </td>
                ))}
                {hasActions && (
                  <td className={styles.td}>
                    <div className={styles.actionIcons}>
                      {actions.view && (
                        <button
                          className={`${styles.iconBtn} ${styles.viewBtn}`}
                          title="View"
                          onClick={() => actions.view(row, "View")}
                        >
                          <FaEye />
                        </button>
                      )}
                      {actions.edit && (
                        <button
                          className={`${styles.iconBtn} ${styles.editBtn}`}
                          onClick={() => actions.edit(row, "Edit")}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {actions.delete && (
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => actions.delete(row, "Delete")}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Table;
