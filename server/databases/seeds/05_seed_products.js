exports.seed = function(knex,Promise) {
    const data = [
      {
        "id": "1",
        "name": "Towhi",
        "brand": "Sony",
        "modelName": "MZW0001",
        "madeIn": "Japan",
        "price": "45000",
        "activeDate": "10/12/2023",
        "expriedDate": "10/12/2023",
      },
    ]
  
    return knex('products').del()
    .then(async () => {
      // Inserts seed entries
      await knex('products').insert(data);
      await knex.raw('select setval(\'products_id_seq\', max(id)) from products');
    });
  };