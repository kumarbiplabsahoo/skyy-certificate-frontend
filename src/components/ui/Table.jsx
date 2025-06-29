import styles from "../../assets/styles/ui/Table.module.css";
import clsx from "clsx";

export const Table = ({ children, className }) => {
  return <table className={clsx(styles.table, className)}>{children}</table>;
};

export const Thead = ({ children, className }) => {
  return <thead className={clsx(styles.thead, className)}>{children}</thead>;
};

export const Tbody = ({ children, className }) => {
  return <tbody className={clsx(styles.tbody, className)}>{children}</tbody>;
};

export const Tr = ({ children, className }) => {
  return <tr className={clsx(styles.tr, className)}>{children}</tr>;
};

export const Th = ({ children, className }) => {
  return <th className={clsx(styles.th, className)}>{children}</th>;
};

export const Td = ({ children, className }) => {
  return <td className={clsx(styles.td, className)}>{children}</td>;
};

export const Tfoot = ({ children, className }) => {
  return <tfoot className={clsx(styles.tfoot, className)}>{children}</tfoot>;
};
