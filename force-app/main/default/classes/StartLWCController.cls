public with sharing class StartLWCController {
  @AuraEnabled(cacheable=true)
  public static String getContacts(String contactName) {
    JSONGenerator generator = JSON.createGenerator(false);
    Contact contact = [
      SELECT Id, Name, Email, MobilePhone
      FROM Contact
      WHERE Name = :contactName
      LIMIT 1
    ];
    generator.writeStartObject();
    generator.writeStringField(
      'contactId',
      contact.Id != null ? contact.Id : ''
    );
    generator.writeStringField(
      'contactName',
      contact.Name != null ? contact.Name : ''
    );
    generator.writeStringField(
      'contactEmail',
      contact.Email != null ? contact.Email : ''
    );
    generator.writeStringField(
      'contactPhone',
      contact.MobilePhone != null ? contact.MobilePhone : ''
    );
    generator.writeEndObject();
    return generator.getAsString();
  }

  @AuraEnabled(cacheable=true)
  public static void saveContact(String lastName, String email, String phone) {
    Contact contact = new Contact(
      LastName = lastName,
      Email = email,
      MobilePhone = phone
    );
    insert contact;
  }

  // @AuraEnabled(cacheable=true)
  // public static Car_Center__c getSingleCenter(String id){
  //     return [SELECT Id, Name, Address__c, Contact_Number__c
  //             FROM Car_Center__c
  //             WHERE Id=:id
  //             LIMIT 1];
  // }
}
