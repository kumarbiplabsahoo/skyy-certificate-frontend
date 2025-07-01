import { useCertificateType } from "../../App";

export default function Bulk() {
  const type = useCertificateType();
  return (
    <div>
      <h1>Bulk Certificate - {type}</h1>
      {/* Your bulk certificate implementation based on type */}
    </div>
  );
}
