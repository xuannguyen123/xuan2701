import axios from "axios";
import { useState } from "react";
import ErrorsForm from "../Error/FormError";
import { useNavigate } from "react-router-dom";

function Login () {
    const navigate = useNavigate()

    const [input, setInput] = useState({  
        email: "",
        password: "",
        level: 0,
    })
    const [errors, setErrors] = useState({})
    const handleInputs = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state => ({...state, [nameInput]: valueInput}))
    }
    function handleSubmit (e) {
        e.preventDefault();
        let flag = true;
        let errorLogin = {}

        if (input.email =="") {
            errorLogin.name = "vui long nhap email"
            flag = false;
        }

        if (input.password =="") {
            errorLogin.password = "vui long nhap password"
            flag = false;
        }
        if (!flag) {
            setErrors(errorLogin)
        } else {
            setErrors('')

             axios.post('http://localhost/laravel/laravel/public/api/login', input)
             .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    navigate("/home");
                    let res = response.data
                    localStorage.setItem('userLogin', JSON.stringify(input))
                    localStorage.setItem('responseLogin', JSON.stringify(res))
                }
             })
             .catch (err => console.log(err))
        }
    }


          return (
            <div className="col-sm-4 col-sm-offset-1">
                <div className="login-form">
                    <h2>Login</h2>
                    <form action="#" onSubmit={handleSubmit}>

                        <input 
                            type="text" 
                            name="email"
                            placeholder="Email" 
                            onChange={handleInputs}
                        />

                        <input
                            type="password" 
                            name="password"
                            placeholder="Password"
                            onChange={handleInputs}
                        />

                        <ErrorsForm errors={errors} />

                        <span>
                        <input type="checkbox" className="checkbox" /> 
                        Keep me signed in
                        </span>
                        <button type="submit" className="btn btn-default">Login</button>
                    </form>
                </div>
          </div>    
             
              
          );
}

export default Login;