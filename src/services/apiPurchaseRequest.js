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