
import { client } from "../config/pocketbase";


const useCreateConsumables = () => {
    
    const addConsumables = async (data) => {
        try {
            await client.collection('asset').create(data);

            return { success: true, message: 'Successfully added!' };
        } 
        
        catch (error) {
            console.log(error);
            return { success: false, message: 'Failed to add transaction.' };
        }
    }

    return {addConsumables}

}

export default useCreateConsumables;


// const useAddTransaction = () => {

//     const transactionCollectionRef = collection(db, 'transactions');
//     const {userID} = useGetUserInfo();

//     const addTransaction = async ({description, transactionAmount}) => {
//         try {
//             await addDoc(transactionCollectionRef, {
//                 userID: userID,
//                 description: description,
//                 transactionAmount: +transactionAmount,
//                 createdAt: serverTimestamp()
//             })

//             return { success: true, message: 'Successfully added!' };
//         } 
        
//         catch(error) {
//             return { success: false, message: 'Failed to add transaction.' };
//         } 
        
       
//     }

//     return {addTransaction}
// }