
import "./modal.css";
function Modal({ setOpenModal, modalHeader, modalText, action }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{modalHeader}</h1>
        </div>
        <div className="body">
          <p>{modalText}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button   onClick={()=>{
             action();
             setOpenModal(false);
          }}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
