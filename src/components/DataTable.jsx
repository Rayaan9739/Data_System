export default function DataTable({
  data,
  columns,
  onDelete,
  onEdit,
  onReset,
}) {
  if (!data.length) return null;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((c, j) => (
                <td key={j}>{row[c]}</td>
              ))}
              <td style={{ display: "flex", gap: "0.5rem" }}>
                {onEdit && (
                  <button onClick={() => onEdit(i)} className="btn-blue">
                    Edit
                  </button>
                )}
                {onReset && (
                  <button onClick={() => onReset(i)} className="btn-green">
                    Reset
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(i)} className="btn-gray">
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
