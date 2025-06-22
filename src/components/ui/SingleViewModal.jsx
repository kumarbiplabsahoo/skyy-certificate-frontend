export default function SingleView({ data, viewKeys = [] }) {
  const viewKeySet = new Set(viewKeys);
  const hasViewKeys = viewKeys.length > 0;

  const imageKey = Object.keys(data || {}).find(
    (key) =>
      key.toLowerCase().includes("image") || key.toLowerCase().includes("logo")
  );

  const isViewAllowed = (fullKey) => {
    return !hasViewKeys || viewKeySet.has(fullKey);
  };

  // ✅ PLACE THIS FUNCTION HERE
  const formatValue = (parentKey, value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([childKey, childValue]) => {
            const fullKey = `${parentKey}.${childKey}`;
            if (!isViewAllowed(fullKey)) return null;

            // ✅ Show value only, skip childKey label
            return (
              <div key={childKey}>
                <span>{String(childValue)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="p-2 max-w-3xl mx-auto">
      {imageKey && data[imageKey] && isViewAllowed(imageKey) && (
        <div className="flex justify-center mb-6">
          <img
            src={
              data[imageKey].startsWith("http") ||
              data[imageKey].startsWith("data:image")
                ? data[imageKey]
                : `data:image/png;base64,${data[imageKey]}`
            }
            alt="Preview"
            className="w-20 h-20 object-cover border rounded-lg shadow-md"
          />
        </div>
      )}

      <table className="w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <tbody>
          {Object.entries(data || {}).map(([key, value], index) => {
            const isDirectFieldAllowed = isViewAllowed(key);
            const isNested =
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value);
            const hasVisibleNestedFields =
              isNested &&
              Object.keys(value).some((subKey) =>
                isViewAllowed(`${key}.${subKey}`)
              );

            if ((isNested && hasVisibleNestedFields) || isDirectFieldAllowed) {
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4 font-semibold bg-gray-100 w-1/3 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  <td className="p-4">{formatValue(key, value)}</td>
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}
