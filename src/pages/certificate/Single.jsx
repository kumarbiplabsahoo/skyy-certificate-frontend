import { useCertificateType } from "../../App";

export default function Single() {
  const type = useCertificateType();
  return (
    <div>
      <h1>Single Certificate - {type}</h1>
      {/* Your single certificate implementation based on type */}
    </div>
  );
}
