import { client } from "../config/pocketbase";


export const useGetAsset = async () => {

    try {

        const response = await client.collection('asset').getFullList({
            sort: 'created',
            requestKey: null,
            expand: 'assigned_to'
        });

        return response;

    } catch (error) {

        console.error(error);
        throw new Error('Consumables could not be loaded');

    } 

};


export const createEditConsumable = async (newConsumable, id) => {

    let query = client.collection('asset');
    let response = null;

    try {
        
        if (!id) response = await query.create(newConsumable);

        if (id) response = await query.update(id, newConsumable);

        if (response.status == 400) throw Error(response.message);

        return { success: true, message: `Successfully ${id ? 'Edited!' : 'Added!'}`, data: response };
    } 
    
    catch (error) {
        console.log(error);
        throw new Error(error.message || 'An error occured');
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

