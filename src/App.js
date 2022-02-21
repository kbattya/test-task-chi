import React, { useState, useEffect } from "react";
import { amountSum } from "./utils/helpers";
import { LoanTicket } from "./components/loan-ticket/loan-item";
import { Modal } from "./components/modal/modal";
import "./App.css";

const App = () => {
  const [loans, setLoans] = useState([]);
  const [loansLoading, setLoansLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [singleLoan, setSingleLoan] = useState(null);

  const getData = async () => {
    setLoansLoading(true);
    try {
      const response = await fetch("./current-loans.json");

      if (response.ok) {
        const { loans } = await response.json();
        setLoans(
          loans.map((item) => {
            return {
              ...item,
              invested: false,
              available: parseFloat(item.available.replace(/,/g, "")),
            };
          })
        );
        setLoansLoading(false);
      }
    } catch (err) {
      setLoansLoading(false);
      throw new Error("Failed loans request");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openModalLoan = (id) => {
    setSingleLoan(loans.find((item) => item.id === id));
    setShowModal(true);
  };

  const createNewInvestment = (id, value) => {
    const temp = loans.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          invested: true,
          available: item.available - value,
        };
      }
      return item;
    });

    setLoans(temp);
  };

  return (
    <div className="App">
      <div className="app-title-box">
        <h1 className="app title">Current Loans</h1>
      </div>

      {loansLoading && <h1>Loading</h1>}
      {loans.length > 0 &&
        loans.map((item) => (
          <LoanTicket key={item.id} item={item} handleClick={openModalLoan} />
        ))}

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          item={singleLoan}
          handleClick={createNewInvestment}
        />
      )}

      {loans.length > 0 && (
        <div>
          <p>
            Total amount available for investments: <b>&#163;{amountSum(loans)}</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
