


const ConfirmDelete = ( {resourceName, name,onConfirm, disabled, onCloseModal} ) => {
    return (
        <div className="form-control gap-5">

            <div className="flex items-center gap-2">
                <i className="fi fi-rr-triangle-warning flex text-xl"></i>
                <span 
                    className="text-lg font-bold"
                >
                    Delete Confirmation
                </span>
            </div>

            <p>
                Are you sure do you want to delete {name} permanently? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

                <button 
                    className="btn text-white" 
                    disabled={disabled} 
                    onClick={onCloseModal}
                >
                    Cancel
                </button>

                <button 
                    className="btn btn-error text-white" 
                    disabled={disabled} 
                    onClick={onConfirm}
                >
                    
                    {disabled ?  (
                         <>
                            <span className="loading loading-spinner"></span> 
                            Deleting
                         </>
                    ) : 'Delete'}
                </button>

            </div>
        
        </div>
    )
}

export default ConfirmDelete;