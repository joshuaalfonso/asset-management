import { client } from "../config/pocketbase";


export const getDepartment = async () => {
    
    try {
        
        const response = await client.collection('department').getFullList();

        if (response.code === 404) throw new Error('Department not found');

        return response;

    }

    catch (err) {
        console.error('Fetching department error', err);
        throw new Error(err.message || 'An error occured while fetching department');
    }

} 


export const createEditDepartment = async (newDepartment, id) => {

    let query = client.collection('department');
    let response = null;

    try {

        if (id) response = await query.update(id, newDepartment);

        if (!id) response = await client.collection('department').create(newDepartment);

        if (response.code === 404) throw new Error(response.message);

        return response;

    }

    catch (error) {
        console.log(error);
        throw new Error(error.message || 'An error occured');
    }

}

export const deleteDepartment = async (id) => {

    try {

        const response = await client.collection('department').delete(id);

        if (response.code === 404) throw new Error(response.message);

        return response;

    }

    catch (error) {
        console.log(error);
        throw new Error(error.message || 'An error occured');
    }


}
