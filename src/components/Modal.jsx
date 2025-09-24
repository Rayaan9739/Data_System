export default function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{message}</p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button onClick={onConfirm} className="btn-green">
            Confirm
          </button>
          <button onClick={onCancel} className="btn-gray">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
