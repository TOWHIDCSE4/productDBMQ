
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "name": "root",
      "description": "root",
      "value": "15",
      "key": "root",
    }
  ]

  // Deletes ALL existing entries
  return knex('permissions').del()
    .then(async () => {
      // Inserts seed entries
      await knex('permissions').insert(data);
      await knex.raw('select setval(\'permissions_id_seq\', max(id)) from permissions');
    });
};
