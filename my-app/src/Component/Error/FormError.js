function ErrorsForm (props) {
    function renderErrorForm () {
        let errors = props.errors;
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map((key, index) => {
                return (
                        <p key={index}>{errors[key]}</p>
                    )
            })
        }
     
    }
   return (
    <>
        {renderErrorForm()}
    </>
   )
}

export default ErrorsForm;