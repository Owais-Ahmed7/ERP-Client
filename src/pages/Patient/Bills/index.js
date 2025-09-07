import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect, useDispatch } from "react-redux";
import Wrapper from "../Components/Wrapper";
import {
  ADVANCE_PAYMENT,
  DEPOSIT,
  INVOICE,
  OPD,
  REFUND,
} from "../../../Components/constants/patient";
import AdvancePayment from "./AdvancePayment";
import Invoice from "./Invoice";
import { DropdownItem, Row } from "reactstrap";
import {
  createEditBill,
  depositToAdvance,
  removeBill,
  setTotalAmount,
  togglePrint,
} from "../../../store/actions";
import DeleteModal from "../../../Components/Common/DeleteModal";
import RenderWhen from "../../../Components/Common/RenderWhen";
import Deposit from "./Deposit";

const Bills = ({
  addmissions,
  addmission,
  data,
  toggleDateModal,
  patient,
  user,
}) => {
  const dispatch = useDispatch();
  const [bill, setBill] = useState({
    bill: null,
    isOpen: false,
  });

  const [dpstToAdvance, setDepositToAdvance] = useState({
    deposit: null,
    isOpen: false,
  });

  const cancelDepositConversion = () => {
    setDepositToAdvance({
      deposit: null,
      isOpen: false,
    });
  };

  const proceedDepositConversion = () => {
    dispatch(
      depositToAdvance({
        depositId: dpstToAdvance.deposit?.deposit?._id,
        amount: dpstToAdvance.deposit?.deposit?.totalAmount,
        author: user?._id,
        patient: dpstToAdvance.deposit?.patient,
        center: dpstToAdvance.deposit?.center?._id,
        addmission: dpstToAdvance.deposit?.addmission,
        paymentModes: dpstToAdvance.deposit?.deposit?.paymentModes,
      })
    );
    setDepositToAdvance({
      deposit: null,
      isOpen: false,
    });
  };

  const editBill = (bill) => {
    dispatch(createEditBill({ data: bill, bill: bill.bill, isOpen: false }));
    toggleDateModal();
  };

  let calcAdvance = 0;
  let adReserve = 0;
  let previousPayable = 0;
  let totalDeposit = 0;
  let totalAdvance = 0;
  let totalPayable = 0;

  const newBills = (_.cloneDeep(data) || []).map((item, idx) => {
    if (item.bill === ADVANCE_PAYMENT) {
      calcAdvance += parseFloat(item.advancePayment?.totalAmount);
      if (previousPayable && previousPayable > adReserve + calcAdvance) {
        previousPayable -= adReserve + calcAdvance;
        item.advancePayment.calculatedPayable = previousPayable;
        calcAdvance = 0;
        adReserve = 0;
      } else {
        calcAdvance += adReserve - previousPayable;
        if (item.advancePayment) {
          item.advancePayment.calculatedAdvance = calcAdvance;
        }
        previousPayable = 0;
        adReserve = 0;
      }
      totalAdvance += item.advancePayment.totalAmount;
    } else if (
      (item.bill === INVOICE || item.bill === REFUND) &&
      item.type !== OPD
    ) {
      if (adReserve > 0) {
        adReserve += calcAdvance;
        if (adReserve > parseFloat(item.invoice?.payable)) {
          item.invoice.currentAdvance = adReserve;
          adReserve = adReserve - parseFloat(item.invoice?.payable);
          item.invoice.calculatedAdvance = adReserve;
          item.invoice.calculatedPayable = 0;
        } else {
          item.invoice.currentAdvance = adReserve;
          previousPayable = 0 + parseFloat(item.invoice?.payable) - adReserve;
          item.invoice.calculatedPayable = previousPayable;
          adReserve = 0;
        }
        calcAdvance = 0;
      } else {
        if (calcAdvance > parseFloat(item.invoice?.payable) + previousPayable) {
          item.invoice.currentAdvance = calcAdvance;
          adReserve =
            calcAdvance - (parseFloat(item.invoice?.payable) + previousPayable);
          item.invoice.calculatedAdvance = adReserve;
          item.invoice.calculatedPayable = 0;
          previousPayable = 0;
        } else {
          if (item.invoice) {
            item.invoice.currentAdvance = calcAdvance;
            item.invoice.previousPayable = previousPayable;
            previousPayable += parseFloat(item.invoice?.payable) - calcAdvance;
            item.invoice.calculatedPayable = previousPayable;
          }
        }
        calcAdvance = 0;
      }
      totalPayable += item.invoice?.payable || 0;
    }

    if (item.bill === DEPOSIT) totalDeposit += item.deposit.remainingAmount;

    if (item.bill === "REFUND" && calcAdvance === 0 && adReserve === 0) {
      item.invoice.refund = 0;
    } else if (
      item.bill === "REFUND" &&
      (calcAdvance || adReserve) > (item.invoice.calculatedPayable || 0)
    ) {
      const remainingAdvance =
        (calcAdvance || adReserve) - item.invoice.calculatedPayable;
      if (item.invoice?.refund < (calcAdvance || adReserve)) {
        item.invoice.refund =
          remainingAdvance - (remainingAdvance - item.invoice?.refund);
        calcAdvance = remainingAdvance - item.invoice?.refund;
      } else {
        item.invoice.refund = remainingAdvance;
        calcAdvance = 0;
      }
      adReserve = 0;
    }
    return item;
  });

  useEffect(() => {
    if (
      newBills?.length > 0 &&
      addmissions?.length > 0 &&
      addmissions[0]._id === addmission._id &&
      patient.addmissions?.includes(addmission?._id)
    ) {
      const bill = newBills[0];
      if (bill.bill === INVOICE) {
        dispatch(
          setTotalAmount({
            calculatedPayable: bill.invoice?.calculatedPayable,
            calculatedAdvance: bill.invoice?.calculatedAdvance,
            totalPayable,
            totalAdvance,
            totalDeposit,
          })
        );
      } else if (bill.bill === DEPOSIT) {
        if (adReserve <= 0 && previousPayable <= 0) {
          dispatch(
            setTotalAmount({
              calculatedPayable: 0,
              calculatedAdvance: totalAdvance,
              totalPayable,
              totalAdvance,
              totalDeposit,
            })
          );
        } else if (adReserve <= 0) {
          dispatch(
            setTotalAmount({
              calculatedPayable: previousPayable,
              calculatedAdvance: 0,
              totalPayable,
              totalAdvance,
              totalDeposit,
            })
          );
        } else {
          dispatch(
            setTotalAmount({
              calculatedPayable: 0,
              calculatedAdvance: adReserve,
              totalPayable,
              totalAdvance,
              totalDeposit,
            })
          );
        }
      } else if (bill.bill === REFUND) {
        dispatch(
          setTotalAmount({
            calculatedPayable: 0,
            calculatedAdvance: calcAdvance,
            totalPayable,
            totalAdvance,
            totalDeposit,
          })
        );
      } else {
        dispatch(
          setTotalAmount({
            calculatedPayable: bill.advancePayment?.calculatedPayable ?? 0,
            calculatedAdvance: bill.advancePayment?.calculatedAdvance,
            totalPayable,
            totalAdvance,
            totalDeposit,
          })
        );
      }
    } else if (!patient.addmissions?.includes(addmission?.addmissionId))
      dispatch(setTotalAmount({ totalPayable: 0, totalAdvance: 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, newBills, addmissions, addmission]);

  const cancelDelete = () => {
    setBill({
      bill: null,
      isOpen: false,
    });
  };

  const deleteBill = () => {
    dispatch(removeBill(bill.bill._id));
    setBill({
      bill: null,
      isOpen: false,
    });
  };

  const getBill = (bill) => {
    setBill({
      bill,
      isOpen: true,
    });
  };

  const printBill = (chart, patient) => {
    dispatch(
      togglePrint({ data: chart, modal: true, patient, admission: addmission })
    );
  };
  return (
    <React.Fragment>
      <div className="timeline-2">
        <div className="timeline-continue">
          <Row className="timeline-right">
            {(newBills || [])
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((bill) => (
                <Wrapper
                  key={bill._id}
                  item={bill}
                  name="Billing"
                  editItem={editBill}
                  deleteItem={getBill}
                  printItem={printBill}
                  extraOptions={(item) => (
                    <RenderWhen isTrue={item.bill === DEPOSIT}>
                      <DropdownItem
                        onClick={() =>
                          setDepositToAdvance({ deposit: item, isOpen: true })
                        }
                        href="#"
                      >
                        <i className="ri-exchange-dollar-line align-bottom text-muted me-2"></i>
                        Convert to Advance
                      </DropdownItem>
                    </RenderWhen>
                  )}
                  toggleDateModal={toggleDateModal}
                  disableEdit={
                    bill.bill === ADVANCE_PAYMENT &&
                    user?.email !== "bishal@gmail.com" &&
                    user?.email !== "rijutarafder000@gmail.com" &&
                    user?.email !== "surjeet.parida@gmail.com" &&
                    user?.email !== "hemanthshinde@gmail.com" &&
                    user?.email !== "vikash@jagrutirehab.org"
                      ? true
                      : false
                  }
                  itemId={`${bill?.id?.prefix}${bill?.id?.patientId}-${bill?.id?.value}`}
                  disableDelete={addmission?.dischargeDate ? true : false}
                >
                  <RenderWhen isTrue={bill.bill === ADVANCE_PAYMENT}>
                    <AdvancePayment data={bill?.advancePayment} />
                  </RenderWhen>
                  <RenderWhen isTrue={bill.bill === DEPOSIT}>
                    <Deposit data={bill?.deposit} />
                  </RenderWhen>
                  <RenderWhen
                    isTrue={bill.bill === INVOICE || bill.bill === REFUND}
                  >
                    <Invoice data={bill?.invoice} bill={bill} />
                  </RenderWhen>
                </Wrapper>
              ))}
          </Row>
        </div>
      </div>
      <DeleteModal
        onCloseClick={cancelDelete}
        onDeleteClick={deleteBill}
        show={bill.isOpen}
      />
      <DeleteModal
        onCloseClick={cancelDepositConversion}
        onDeleteClick={proceedDepositConversion}
        messsage={"Are you sure you want to convert Deposit to Advance"}
        buttonMessage={"Yes Proceed"}
        show={dpstToAdvance.isOpen}
      />
    </React.Fragment>
  );
};

Bills.propTypes = {
  data: PropTypes.array,
  toggleDateModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.User.user,
  addmissions: state.Bill.data,
  patient: state.Patient.patient,
});

export default connect(mapStateToProps)(Bills);
