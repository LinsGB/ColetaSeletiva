import Knex from 'knex'

export async function up(knex: Knex) {
    //criar tabela
   return knex.schema.createTable('point_item', tablePoint_Item => {
        tablePoint_Item.increments('id').primary();
        //configurando foreignkey
        tablePoint_Item.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('point');
        //configurando foreignkey
        tablePoint_Item.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('item');

    });
}

export async function down(knex: Knex) {
    //remover
    return knex.schema.dropTable('point_item');
}