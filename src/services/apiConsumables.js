import { client } from "../config/pocketbase";


export const useGetAsset = async () => {

    try {

        const response = await client.collection('asset').getFullList({
            sort: '-created',
            requestKey: null,
            expand: 'assigned_to'
        });

        return response;

    } catch (error) {

        console.error(error);
        throw new Error('Consumables could not be loaded');

    } 

};


export const createConsumable = async (newConsumable) => {

    try {
        await client.collection('asset').create(newConsumable);

        return { success: true, message: 'Successfully added!' };
    } 
    
    catch (error) {
        console.log(error);
        return { success: false, message: 'Failed to add transaction.' };
    }

}


export const deleteConsumables = async (id) => {
    
    try {
        const response = await client.collection('asset').delete(id);

        return response;
    } 

    catch (error) {
        console.error(error);
        throw new Error('Consumables could not be deleted');
    }


}

