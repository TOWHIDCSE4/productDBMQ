/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex, Promise)  {
  const data = [
    {
      "id": "1",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "Rejected",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
    {
      "id": "2",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "To Be Reviewed",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
    {
      "id": "3",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "Rejected",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
    {
      "id": "4",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "Approve",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
    {
      "id": "5",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "Rejected",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
    {
      "id": "6",
      "formId": "BseE2011",
      "formName": "BSE Document",
      "issuedBy": "Islam",
      "issuedDate" : '01/01/2022',
      "submitter": "BSE Document",
      "company": "MQ Soluation",
      "tenant": "BSE Document",
      "status": "Rejected",
      "updatedDate" : '01/01/2022',
      "createdBy" : '1',
      "updatedBy" : '1',
    },
  ]

  // Deletes ALL existing entries
  return knex('documents').del()
    .then(async () => {
      // Inserts seed entries
      await knex('documents').insert(data);
      await knex.raw('select setval(\'documents_id_seq\', max(id)) from documents');
    });
};