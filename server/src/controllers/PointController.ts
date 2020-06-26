import { Request, Response, request } from 'express';
import knex from '../database/conection';

class PointController {

    async index(request: Request, response: Response) {
        const { city, uf, item } = request.query;

        const parsedItems = String(item)
        .split(',')
        .map( splitedItem => Number(splitedItem.trim()));

        const points = await knex('point')
        .join('point_item', 'point.id', '=', 'point_item.point_id')
        .whereIn('point_item.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('point.*');

        return response.json(points);
    };

    async show(request: Request, response: Response) {
        const {id} = request.params;

        const point = await knex('point').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.'});
        }

        const items = await knex('item')
        .join('point_item', 'item.id', '=', 'point_item.item_id')
        .where('point_item.point_id', id);

        return response.json({point, items});
    };

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            image,
            latitude,
            longitude,
            city,
            uf,
            items,

        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedPointIds = await trx('point').insert(point);

        const point_id = insertedPointIds[0];
        const pointItem = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });

        await trx('point_item').insert(pointItem);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
    }
};
export default PointController;