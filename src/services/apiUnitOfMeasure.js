import { client } from "../config/pocketbase"


export const getUnitOfMeasure = async () => {

    try {

        const response = client.collection('unitOfMeasure').getFullList();

        if (response.code === 404) throw new Error(response.message);

        return response;

    } 
    
    catch (err) {
        console.error(err)
        throw new Error(err.message || 'An error occred white fetching UoM')
    }

}


export const createUnitOfMeasure = async (newUnitOfMeasure, id) => {

    const query = client.collection('unitOfMeasure');
    let response = null;
    
    try {

        if(!id)response = query.create(newUnitOfMeasure);

        if (id) response = query.update(id, newUnitOfMeasure);

        if (response.code === 404) throw error('Unknown error occured');

        return response;

    }

    catch (err) {
        console.error(err);
        throw new Error(err);
    }


}

export const deleteUnitOfMeasure = async (id) => {
    
    try {
        const response = await client.collection('unitOfMeasure').delete(id);

        return response;
    } 

    catch (error) {
        console.error(error);
        throw new Error(error);
    }


}

