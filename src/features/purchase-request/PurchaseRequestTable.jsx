import { AlertMessage } from "../../ui/AlertMessage";
import { LoaderSpinner } from "../../ui/LoadingSpinner";
import PurchaseRequestRow from "./PurchaseRequestRow";
import usePurchaseRequest from "./usePurchaseRequest";


const PurchaseRequestTable = () => {


     const { purchaseRequest, isLoading , error } = usePurchaseRequest();

     if (isLoading) return <LoaderSpinner />;

     if (error) return <AlertMessage message={error.message} />

    return (
        <>
            <div className="overflow-x-auto bg-base-200 rounded-xl p-3">
                <table className="table ">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>PR Date</th>
                        <th>PR #</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    {purchaseRequest.map((row, index) => (
                        <PurchaseRequestRow 
                            row={row} 
                            key={row.id} 
                            index={index} 
                        />
                    ))}

                    </tbody>
                    
                </table>

            </div>
        </>
    )
}

export default PurchaseRequestTable;