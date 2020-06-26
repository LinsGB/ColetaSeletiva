import Knex from 'knex'

export async function up(knex: Knex) {
    //criar tabela
   return knex.schema.createTable('point', tablePoint => {
        tablePoint.increments('id').primary();
        tablePoint.string('image').notNullable();
        tablePoint.string('name').notNullable();
        tablePoint.string('email').notNullable();
        tablePoint.string('whatsapp').notNullable();
        tablePoint.decimal('latitude').notNullable();
        tablePoint.decimal('longitude').notNullable();
        tablePoint.string('city').notNullable();
        tablePoint.string('uf', 2).notNullable();

    });
}

export async function down(knex: Knex) {
    //remover
    return knex.schema.dropTable('point');
}