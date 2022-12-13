exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments();
        table.string('name').nullable();
        table.string('brand').nullable();
        table.string('modelName').nullable();
        table.string('madeIn').nullable();
        table.integer('price').nullable();
        table.timestamp('activeDate').defaultTo(knex.fn.now());
        table.timestamp('expriedDate').defaultTo(knex.fn.now());
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.integer('createdBy').nullable().index().references('id').inTable('products')
          .onUpdate('CASCADE')
          .onDelete('SET NULL');
        table.integer('updatedBy').nullable().index().references('id').inTable('products')
          .onUpdate('CASCADE')
          .onDelete('SET NULL');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
