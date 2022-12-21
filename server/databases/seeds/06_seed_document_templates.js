/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex, Promise)  {
  const data = [
    {
     "id": "1",
     "formName": "BseE2011",
     "content": [
      {
       "FirstName": "Julie",
       "LastName": "Oh so sunny!",
       "Email": "to@gmail.com",
       "PhoneNumber": "0128455755",
       "DateOfBirth": "01/01/2022",
       "Address": "Hanoi",
       "AppartmentNumber": "20145",
       "ZipCode": "250000",
       "comments": []
      }
     ],
     "locale": "vi",
     "countryCode":"+84"
    },
    {
      "id": "2",
      "formName": "BseE20555",
       "content": [
        {
         "FirstName": "Julie",
         "LastName": "Oh so sunny!",
         "Email": "to@gmail.com",
         "PhoneNumber": "0128455755",
         "DateOfBirth": "01/01/2022",
         "Address": "Hanoi",
         "AppartmentNumber": "20145",
         "ZipCode": "250000",
         "comments": []
        }
       ],
       "locale": "en",
       "countryCode":"+88"
      },
   ]
  // Deletes ALL existing entries
  return knex('document_templates').del()
    .then(async () => {
      // Inserts seed entries
      await knex('document_templates').insert(data);
      await knex.raw('select setval(\'document_templates_id_seq\', max(id)) from document_templates');
    });
};
