





const ConfirmDelete = ( {resourceName, onConfirm, disabled, onCloseModal} ) => {
    return (
        <div className="form-control gap-4">

            <h3 
                className="text-lg font-bold"
            >
                Delete {resourceName}
            </h3>

            <p>
                Are you sure do you want to delete this {resourceName} permanently? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">

                <button 
                    className="btn" 
                    disabled={disabled} 
                    onClick={onCloseModal}
                >
                    Cancel
                </button>

                <button className="btn btn-error" disabled={disabled} onClick={onConfirm}>
                    Delete
                </button>
                
            </div>
        
        </div>
    )
}

export default ConfirmDelete;