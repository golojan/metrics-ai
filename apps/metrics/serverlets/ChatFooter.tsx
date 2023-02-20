import React from "react";
import { IonIcon } from "react-ion-icon";

function ChatFooter() {
  return (
    <>
      <div className="chatFooter mb-10">
        <form>
          <a
            href="javascript:;"
            className="btn btn-icon btn-text-secondary rounded"
          >
            <IonIcon name="camera" />
          </a>
          <div className="form-group basic">
            <div className="input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
              />
              <i className="clear-input">
                <IonIcon name="close-circle" />
              </i>
            </div>
          </div>
          <button type="button" className="btn btn-icon btn-primary rounded">
            <IonIcon name="arrow-forward-outline" />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatFooter;
