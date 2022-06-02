import { LightningElement, wire, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getRecord } from "lightning/uiRecordApi";

const FIELDS = [
  "Car_Center__c.Name",
  "Car_Center__c.Address__c",
  "Car_Center__c.Contact_Number__c"
];

export default class CarCenterHeader extends LightningElement {
  @api recordId;

  center;
  name;
  address;
  phone;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  wiredRecord({ error, data }) {
    if (error) {
      let message = "Unknown error";
      if (Array.isArray(error.body)) {
        message = error.body.map((e) => e.message).join(", ");
      } else if (typeof error.body.message === "string") {
        message = error.body.message;
      }
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading center",
          message,
          variant: "error"
        })
      );
    } else if (data) {
      this.center = data;
      this.name = this.center.fields.Name.value;
      this.address = this.center.fields.Address__c.value;
      this.phone = this.center.fields.Contact_Number__c.value;
    }
  }
}
