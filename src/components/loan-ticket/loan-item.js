import "./loan-item.css";
import { formatNumberToString } from '../../utils/helpers';

export const LoanTicket = ({ item, handleClick }) => {
  const { id, title, available, ltv, invested, annualised_return, amount } = item;
  let indicatorStatus;

  invested ? indicatorStatus = 'invested' : indicatorStatus = 'not-invested';


  return (
    <div className="item">
      <div className="item-content-box">
        <h2>{title.slice(0, -1)}</h2>
        <p className="item-description">
          Annualised return: {annualised_return}, ltv: {ltv}, amount: &#163;{amount}, available: &#163;{formatNumberToString(available)}
        </p>
      </div>
      <div className="item-button-box">
        <p className={indicatorStatus}>Invested</p>
        <button className="invest-button" onClick={() => handleClick(id)}>
          INVEST
        </button>
      </div>
    </div>
  );
};
