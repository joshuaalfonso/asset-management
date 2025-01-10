






const Button = ({btnType = '', onClick, isWorking, isEditSession}) => {
    
    if (btnType == 'cancel') return (
        <button 
            type="reset" 
            className="btn border-2 border-primary text-primary hover:border-primary hover:bg-primary/5"
            onClick={() => onClick?.()}
            disabled={isWorking}
        >
            cancel
        </button>
    );


    if (btnType == 'submit') return (
        <button className="btn btn-primary text-base-300" type='submit' disabled={isWorking}>
            {isWorking && <span className="loading loading-spinner"></span>}
            {isEditSession ? 'Apply changes' : 'Create'}
        </button>
    )


    return <button className="btn">default</button>;


}

export default Button;