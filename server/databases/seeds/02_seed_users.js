
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "username": "root",
      "password": "$2b$10$iNT.d38.rdsRvRMU95WTSu0ZMUBi/Dbwsrzw7yu0vT60T9EPu8eNi", // 123456@
      "firstName": "root",
      "lastName": "",
      "roleId": "1",
      "code" : '5c5652e878449245a480bb2ded80fadd'
    }
  ]

  // Deletes ALL existing entries
  return knex('users').del()
    .then(async () => {
      // Inserts seed entries
      await knex('users').insert(data);
      await knex.raw('select setval(\'users_id_seq\', max(id)) from users');
    });
};
