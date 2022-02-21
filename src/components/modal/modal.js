import { useEffect, useState } from "react";
import { convertSecToDate } from "../../utils/helpers";
import { formatNumberToString } from '../../utils/helpers';
import "./modal.css";

export const Modal = ({ item, onClose, handleClick }) => {
  const { id, title, available, term_remaining } = item;
  const [value, setValue] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (+value > available || +value < 0) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
    }
  }, [available, value]);

  const investButton = () => {
    if (!value) {
      return;
    }
    handleClick(id, +value);
    onClose();
  };

  const onCloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();

    onClose();
  };

  return (
    <div className="loan-modal-background" onClick={() => onClose()}>
      <div
        className="loan-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Invest in Loan</h2>
        <h4>{title}</h4>
        <div className="loan-modal-description-box">
          <p>Amount available: &#163;{formatNumberToString(available)}</p>
          <p>Load ends in: {convertSecToDate(term_remaining)}</p>
        </div>
        <div>
          <p className="loan-modal-form-label">Investment amount (&#163;)</p>
          <div className="investment-form">
            <input
              type="number"
              placeholder="1,000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="invest-button"
              disabled={showValidation}
              onClick={investButton}
            >
              INVEST
            </button>
          </div>
        </div>
        {showValidation && (
          <p>
            You can not invest {formatNumberToString(value)} in this load
          </p>
        )}

        <button className="loan-modal-close" onClick={onCloseModal}>
          Close
        </button>
      </div>
    </div>
  );
};
