/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('documents', function (table) {
        table.increments();
        table.string('formId').nullable();
        table.string('formName').nullable();
        table.string('issuedBy').nullable();
        table.timestamp('issuedDate').defaultTo(knex.fn.now());
        table.string('submitter').nullable();
        table.string('company').nullable();
        table.string('tenant').nullable();
        table.string('status').nullable();
        table.timestamp('updatedDate').defaultTo(knex.fn.now());
        table.integer('createdBy').nullable().index().references('id').inTable('documents')
          .onUpdate('CASCADE')
          .onDelete('SET NULL');
        table.integer('updatedBy').nullable().index().references('id').inTable('documents')
          .onUpdate('CASCADE')
          .onDelete('SET NULL');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
