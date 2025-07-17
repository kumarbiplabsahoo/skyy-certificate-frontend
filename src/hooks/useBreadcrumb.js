// hooks/useBreadcrumb.js
import { useLocation } from "react-router-dom";

const typeMap = {
  free: "Free",
  pgp: "PGP",
  asdc: "ASDC",
  paid: "Paid",
  lor: "LOR",
  internship: "Internship",
  bonafide: "Bonafide",
  clearance: "Clearance",
  faculty1: "Faculty One",
  faculty2: "Faculty Two",
  short: "Short Term",
  long: "Long Term",
};

export function useBreadcrumb() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  return segments.map((segment) => {
    if (segment === "single") return "Single";
    if (segment === "bulk") return "Bulk";
    if (segment === "edit") return "Edit";
    if (typeMap[segment]) return typeMap[segment];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  });
}
