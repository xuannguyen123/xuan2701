import axios from "axios";
import { useEffect, useState } from "react";
import ErrorsForm from "../Error/FormError";

function Account () {
    const [errors, setErrors] = useState({})
    const [token, setToken] = useState({})
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        level: 0
    })

    useEffect(() => {
        let getDataLogin = JSON.parse(localStorage.responseLogin)
        setToken(getDataLogin.success)
        setInput(getDataLogin.Auth);
    }, [])

    const handleInputs = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({...state, [nameInput]: valueInput}))
    }

    function handleSubmit (e) {
        e.preventDefault()
        let flag = true;
        let errorUpdate = {}

        if (input.name =="") {
            errorUpdate.name = "name khong duoc de trong";
            flag = false; 
        } 

        if (input.phone =="") {
            errorUpdate.phone = "phone khong duoc de trong";
            flag = false; 
        } 

        if (input.address =="") {
            errorUpdate.address = "address khong duoc de trong";
            flag = false; 
        } 

        
        if (!flag) {
            setErrors(errorUpdate)
        } else {
            setErrors("")
            let url ='http://localhost/laravel/laravel/public/api/user/update/' + input.id;
            let accessToken = token.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            const formData = new FormData()
            formData.append('name', input.name)
            formData.append('email', input.email)
            formData.append('password', 0)
            formData.append('phone', input.phone)
            formData.append('address', input.address)
            formData.append('level', 0)

            axios.post(url, formData, config )
            .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    console.log("update thanh cong");
                    localStorage.setItem('responseLogin', JSON.stringify(response.data))
                }
            })
            .catch(err => console.log(err))

        }
    }

    function renderInput () {
        if (Object.keys(input).length > 0) {
            return (
                <>
                   <input
                       name="name" 
                       type="text"
                       value={input.name}
                       onChange={handleInputs} 
                       placeholder="Name"
                   />
                   <input 
                       name="email" 
                       type="email" 
                        readOnly
                       value={input.email}
                       onChange={handleInputs} 
                       placeholder="Email" />
    
                   <input 
                       name="password" 
                       type="password" 
                       onChange={handleInputs} 
                       placeholder="Password" />
    
                   <input 
                       name="phone" 
                       type="text" 
                       value={input.phone}
                       onChange={handleInputs} 
                       placeholder="Phone" />
    
                   <input 
                       name="address" 
                       type="text" 
                       value={input.address}
                       onChange={handleInputs} 
                       placeholder="Address"
                   />
    
                   <input 
                        name="avatar" 
                        type="file" 
                        placeholder="Avatar"
                        onChange={handleInputs}
                   />
               </>
            )
        }
       
    }
 
    return (
         <div className="col-sm-4">
             <div className="signup-form">
                <h2>User Update </h2>
                <form onSubmit={handleSubmit} action="#" encType="multipart/form-data">
                    {renderInput()}
                    <ErrorsForm  errors={errors}/>
                    <button type="submit" className="btn btn-default">Signup</button>
                 </form>
            </div>
        </div>
    )
}

export default Account;