import Knex from 'knex'

export async function up(knex: Knex) {
    //criar tabela
   return knex.schema.createTable('item', tableItem => {
        tableItem.increments('id').primary();
        tableItem.string('image').notNullable();
        tableItem.string('title').notNullable();

    });
}

export async function down(knex: Knex) {
    //remover
    return knex.schema.dropTable('item');
}