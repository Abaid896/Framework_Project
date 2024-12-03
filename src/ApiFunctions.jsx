import React from "react";
import ReactDOM from "react-dom";
import Api from "./api/axios";
import servicesApi from "./api/service-api";
import axios from "axios";
import Loader from "./Loader";

class ApiFunctions {

  constructor() {
    this.requestCount = 0;
    this.tableVisible = false; // Initialize tableVisible as false
    this.loaderContainer = null; // Reference to the loader container
  }


  showLoader() {
    this.requestCount++;
    if (this.requestCount === 1 && !this.tableVisible) { // Check if tableVisible is false
      // Show loader only if request count is initially 0 and tableVisible is false
      this.loaderContainer = document.createElement("div");
      this.loaderContainer.className = "loader-container";
      document.body.appendChild(this.loaderContainer);
      ReactDOM.render(<Loader visible={true} />, this.loaderContainer);
    }
  }

  hideLoader() {
    this.requestCount--;
    if (this.requestCount === 0) {
      // Hide loader only if request count becomes 0 again
      if (this.loaderContainer) {
        ReactDOM.unmountComponentAtNode(this.loaderContainer);
        this.loaderContainer.remove();
      }
    }
  }

  
  register(data, headers) {
    this.showLoader();
    return Api.post("/register/user", data, headers).then(response => {
      this.hideLoader();
      return response
    }).catch(error => {
      this.hideLoader();
      throw error;
    });
  }

  
  register(data, headers) {
    this.showLoader();
    return Api.post("/get/categories", data, headers).then(response => {
      this.hideLoader();
      return response
    }).catch(error => {
      this.hideLoader();
      throw error;
    });
  }


}

export default new ApiFunctions();