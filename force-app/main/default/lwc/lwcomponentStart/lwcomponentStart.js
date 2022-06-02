import { LightningElement, wire, track } from "lwc";
import getContacts from "@salesforce/apex/StartLWCController.getContacts";
import saveContact from "@salesforce/apex/StartLWCController.saveContact";

export default class LwcomponentStart extends LightningElement {
  searchKey;
  contactName;
  contactEmail;
  contactPhone;

  @track
  contact = {
    contactName: "",
    contactId: "",
    contactEmail: "",
    contactPhone: ""
  };

  handleEvent(event) {
    this.searchKey = event.target.value;
  }
  handleInputName(event) {
    this.contactName = event.target.value;
  }
  handleInputEmail(event) {
    this.contactEmail = event.target.value;
  }
  handleInputPhone(event) {
    this.contactPhone = event.target.value;
  }
  inserContact() {
    saveContact({
      lastName: this.contactName,
      email: this.contactEmail,
      phone: this.contactPhone
    })
      .then((result) => {
        console.log("contact inserted!");
        console.log(result);
      })
      .catch((result) => {
        console.log("insertion failed!");
        console.log(result);
      });
  }

  @wire(getContacts, { contactName: "$searchKey" }) getData({ data, error }) {
    if (data) {
      this.contact = JSON.parse(data);
    } else if (error) {
      console.log("Following error occured: ");
      console.log(error);
    }
  }
}
