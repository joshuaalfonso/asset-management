import { client } from "../config/pocketbase";



export const getPurchaseRequest = async () => {

    try {

        const response = await client.collection('purchaseRequest').getFullList({
            sort: 'created',
            // requestKey: null,
            expand: 'purchaseRequestItems_via_purchaseRequestId, purchaseRequestItems_via_purchaseRequestId.item'
        });

        return response;

    } catch (error) {

        console.error(error);
        throw new Error('PurchaseRequest could not be loaded');

    } 

};


export const createPurchaseRequest = async (newPurchaseRequest) => {

    try {   

        const response = await client.collection('purchaseRequest').create({...newPurchaseRequest, status: 'Pending'});

        if (response.code === 400) throw error(response.message);

        const prId = response.id;

        const newPRItems = newPurchaseRequest?.purchaseRequestItems.map(item => (
            item = {...item, purchaseRequestId: prId, unitOfMeasure: 'pcs', description: 'test'} 
        ))

        const batch = client.createBatch();

        for (const item of newPRItems) {
            batch.collection('purchaseRequestItems').create(item);
        }

        const result = await batch.send();

        return {success: true, message: 'Successfully added!', data: result};
    }

    catch (error) {
        console.log(error);
        throw new Error(error.message || 'An error occured');
    }

}

export const updatePurchaseRequest = async (newPurchaseRequest, id) => {

    const response = await client.collection('purchaseRequest').update(id, newPurchaseRequest);

    if (response.code === 400) throw error(response.message);

    const batch = client.createBatch();

    const updatedPRItems = newPurchaseRequest.purchaseRequestItems;

    for (const item of updatedPRItems) {
        if (item.id) {
            batch.collection('purchaseRequestItems').update(item.id, item);
        } else {
            batch.collection('purchaseRequestItems').create({...item, purchaseRequestId: id});
        }
    }

    const existingItems = await client.collection('purchaseRequestItems').getFullList(200, { filter: `purchaseRequestId = "${id}"` });

    const deletedItems = existingItems.filter(existingItem => 
        !updatedPRItems.some(newItem => newItem.id === existingItem.id)
    );

    for (const item of deletedItems) {
        batch.collection('PurchaseRequestItems').delete(item.id);
    }

    const result = await batch.send();

    return {success: true, message: 'Successfully updated!', data: result};

}

