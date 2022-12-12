
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "name": "Root",
      "description": "Root",
      "key": "root"
    },
  ]

  // Deletes ALL existing entries
  return knex('roles').del()
    .then(async () => {
      // Inserts seed entries
      await knex('roles').insert(data);
      await knex.raw('select setval(\'roles_id_seq\', max(id)) from roles');
    });
};
