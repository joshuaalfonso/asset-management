import { client } from "../config/pocketbase"


export const getCategory = async () => {

    try {
        const response = await client.collection('category').getFullList();

        if (response.status === 404) throw Error(response.message);

        return response;
    }

    catch (err) {
        console.error(err.message)
        throw new Error(err);
    }

}

export const createCategory = async (newCategory, id) => {

    let query = client.collection('category');
    let response = null;

    try {

        if (id) response = await query.update(id, newCategory);
        if (!id) response = await query.create(newCategory);

        if (response.status === 404) throw Error(response.message);

        return response;

    }

    catch (err) {
        console.error(err.message)
        throw new Error(err);
    }

}


export const deleteCategory = async (id) => {

    try {
        const response = await client.collection('category').delete(id);

        if (response.code === 404) throw Error(response.message);
    
        return response;
    }

    catch (err) {
        console.error(err)
        throw new Error(err.message);
    }

}




