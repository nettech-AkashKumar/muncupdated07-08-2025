import React from "react";
import cr_invoice from "../../assets/img/cre-invoice.png";
import cr_sales from "../../assets/img/cr-sales.png";
import cr_purchase from "../../assets/img/cre-purchase.png";
import gr_qotation from "../../assets/img/gr-quetions.png";
import styled from "styled-components";


const ModelWrapper = styled.div`
  background-color: white;
  box-shadow: inset 0 0 4px rgb(68 67 67 / 18%);
  border-radius: 15px;
  position: absolute;
  z-index: 1;
  right: 20px;
  top: 130px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: #0e101a;
`;

const ModelItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition:0.5s;

  &:hover {
    background-color: #ebeffcff; /* light blue background */
  }
`;
const CreateModel = () => {
  return (
     <ModelWrapper className="dashboard-create-model">
      <ModelItem>
        <img src={cr_invoice} alt="cr_invoice" />
        Create Invoice
      </ModelItem>
      <ModelItem>
        <img src={cr_sales} alt="cr-sales" />
        Create Sales
      </ModelItem>
      <ModelItem>
        <img src={cr_purchase} alt="cr_purchase" />
        Create Purchase
      </ModelItem>
      <ModelItem>
        <img src={gr_qotation} alt="gr_qotation" />
        Generate Quotation
      </ModelItem>
    </ModelWrapper>
  );
};

export default CreateModel;
