import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddDebitNoteModals from "../Modal/debitNoteModals/AddDebitNoteModals";

const DebitNote = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [reference, setReference] = useState("");
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("reference");
    const products = params.get("products")?.split(",").filter(Boolean) || [];
    if (ref) setReference(ref);
    if (products.length) setProductIds(products);
    // Auto open modal if navigated with params
    if (ref && products.length) setShowModal(true);
  }, [location.search]);

  return (
    <div className="debitnote-page">
      <h2>Debit Note</h2>
      {/* Optionally show info about the reference and products */}
      {reference && (
        <div className="mb-3">
          <strong>Reference:</strong> {reference}
        </div>
      )}
      {/* Button to open modal manually if needed */}
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Create Debit Note
      </button>
      {/* Show modal if showModal is true, pass reference and productIds as props or via URL */}
      {showModal && <AddDebitNoteModals />}
    </div>
  );
};

export default DebitNote;
