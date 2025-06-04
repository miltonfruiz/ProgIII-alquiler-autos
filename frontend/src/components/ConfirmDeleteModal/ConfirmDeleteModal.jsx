import "./ConfirmDeleteModal.css";
import { MdCancel } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmDeleteModal = ({
  itemName,
  itemType = "elemento",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-overlay-cars">
      <div className="modal-content-cars confirm-delete">
        <h3 className="confirm-title">
          <IoWarning className="warning-modal-icon" /> ¿Desea eliminar{" "}
          {itemType} "{itemName}"? <IoWarning className="warning-modal-icon" />
        </h3>
        <div className="confirm-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            <FaCheckCircle className="confirm-modal-icon" /> Confirmar
          </button>
          <button className="cancel-button-cars" onClick={onCancel}>
            <MdCancel className="cancel-icon-cars" /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
