import React from "react";
import { IonIcon } from "react-ion-icon";

function index() {
  return (
    <>
      <div>
        {/* Deposit Action Sheet */}
        <div
          className="modal fade action-sheet"
          id="depositActionSheet"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Balance</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="account1">
                          From
                        </label>
                        <select
                          className="form-control custom-select"
                          id="account1"
                        >
                          <option value={0}>Savings (*** 5019)</option>
                          <option value={1}>Investment (*** 6212)</option>
                          <option value={2}>Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="input2">
                            $
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          defaultValue={100}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-dismiss="modal"
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* * Deposit Action Sheet */}
        {/* Withdraw Action Sheet */}
        
        <div
          className="modal fade action-sheet"
          id="withdrawActionSheet"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Withdraw</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="account2d">
                          From
                        </label>
                        <select
                          className="form-control custom-select"
                          id="account2d"
                        >
                          <option value={0}>Savings (*** 5019)</option>
                          <option value={1}>Investment (*** 6212)</option>
                          <option value={2}>Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="text11d">
                          To
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="text11d"
                          placeholder="Enter IBAN"
                        />
                        <i className="clear-input">
                          <IonIcon name="close-circle" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="input14d">
                            $
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder={"0"}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-dismiss="modal"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* * Withdraw Action Sheet */}
        {/* Send Action Sheet */}
        <div
          className="modal fade action-sheet"
          id="sendActionSheet"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Money</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="account2">
                          From
                        </label>
                        <select
                          className="form-control custom-select"
                          id="account2"
                        >
                          <option value={0}>Savings (*** 5019)</option>
                          <option value={1}>Investment (*** 6212)</option>
                          <option value={2}>Mortgage (*** 5021)</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className="label" htmlFor="text11">
                          To
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="text11"
                          placeholder="Enter bank ID"
                        />
                        <i className="clear-input">
                          <IonIcon name="close-circle" />
                        </i>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="input14">
                            $
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder={"0"}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-dismiss="modal"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* * Send Action Sheet */}
        {/* Exchange Action Sheet */}
        <div
          className="modal fade action-sheet"
          id="exchangeActionSheet"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Exchange</h5>
              </div>
              <div className="modal-body">
                <div className="action-sheet-content">
                  <form>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <label className="label" htmlFor="currency1">
                              From
                            </label>
                            <select
                              className="form-control custom-select"
                              id="currency1"
                            >
                              <option value={1}>EUR</option>
                              <option value={2}>USD</option>
                              <option value={3}>AUD</option>
                              <option value={4}>CAD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <label className="label" htmlFor="currency2">
                              To
                            </label>
                            <select
                              className="form-control custom-select"
                              id="currency2"
                            >
                              <option value={1}>USD</option>
                              <option value={1}>EUR</option>
                              <option value={2}>AUD</option>
                              <option value={3}>CAD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Enter Amount</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="input1">
                            $
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          defaultValue={100}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        data-dismiss="modal"
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* * Exchange Action Sheet */}
      </div>
    </>
  );
}

export default index;
