import axios from "axios";
import { useState } from "react";
import ErrorsForm from "../Error/FormError";

function Register () {
    const [inputs, setInputs] = useState({  
        name:  "",
        email: "",
        password: "",
        phone: "",
        address: "",
        level: 0,
    })
    const [errors, setErrors] = useState({})
    const [files, setFiles] = useState('')
    const [avatar, setAvatar] = useState('')

    const handleUserInputFiles = (e) => {
        const file = (e.target.files)
        // send file to API server
        let reader = new FileReader();
        reader.onload = (e) => {
            setFiles(file[0])
            setAvatar(e.target.result)
        }
        reader.readAsDataURL(file[0])
    }

    function handleInputs (e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({...state, [nameInput]: valueInput}))
    }

    function handleSubmit (e) {
        e.preventDefault();
        let ErrorRegisters = {}
        let flag = true;
        
        if (inputs.name == "") {
         ErrorRegisters.name = "chua nhap ten"
          flag = false;
        }   

        if (inputs.email == "") {
            ErrorRegisters.email = "chua nhap email"
             flag = false;

        } 

        if (inputs.password == "") {
          ErrorRegisters.password = "chua nhap password"
          flag = false;
        } 

        if (inputs.phone == "") {
            ErrorRegisters.phone = "chua nhap phone"
            flag = false;
        }   
        
        if (inputs.address == "") {
            ErrorRegisters.phone = "chua nhap address"
            flag = false;
        } 
        // file
        if (files == "") {
            ErrorRegisters.files = "chua nhap files"
            flag = false;
        } else {
            const typeImg = ["png", "jpg", "jpeg", "PNG", "JPG"]
            let arrTypeImage = files.type.split("/");
            let imageFormat = arrTypeImage[1]

            if (!typeImg.includes(imageFormat)) {
                ErrorRegisters.file = 'sai dinh dang';
                flag = false;
            } else if (files.size > 1024 * 1024) {
                ErrorRegisters.file = "> 1024";
                flag = false;
            }        
        }

        if (!flag ) {
            setErrors(ErrorRegisters)
        } else {
            setErrors('') 

            const dataUser = {...inputs, avatar: avatar}
            axios.post("http://localhost/laravel/laravel/public/api/register", dataUser)
            .then(response => {
                if(response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    alert("DK thanh cong")
                }
            })
            .catch(error => { console.log('ERROR: ',error)})
        }


    }   

    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} action="#" encType="multipart/form-data">

                    <input
                        name="name" 
                        type="text" 
                        onChange={handleInputs} 
                        placeholder="Name"
                     />
                    <input 
                        name="email" 
                        type="email" 
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
                        onChange={handleInputs} 
                        placeholder="Phone" />

                    <input 
                        name="address" 
                        type="text" 
                        onChange={handleInputs} 
                        placeholder="Address"
                     />

                    <input 
                        name="avatar" 
                        type="file" 
                        placeholder="Avatar"
                        onChange={handleUserInputFiles}
                     />

                    <input 
                        name="level" 
                        type="text" 
                        onChange={handleInputs} 
                        placeholder="Level"
                     />
                    <ErrorsForm errors={errors} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
      </div>
    )
}

export default Register;