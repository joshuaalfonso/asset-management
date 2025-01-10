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


export const createDepartment = async (data) => {

    try {

        const response = await client.collection('department').create(data);

        if (response.code === 404) throw new Error('An error occured');

        return response;

    }

    catch (err) {
        console.error('Creating department error', err);
        throw new Error(err.message || 'An error occured while creating department');
    }

}