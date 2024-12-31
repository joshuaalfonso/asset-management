import { client } from "../config/pocketbase";









export const getUsers = async () => {

    try {

        const response = await client.collection('users').getFullList({
            sort: 'created',
            requestKey: null,
        });

        return response;

    } catch (error) {

        console.error(error);
        throw new Error('Users could not be loaded');

    } 

}