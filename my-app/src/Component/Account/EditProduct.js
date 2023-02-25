import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ErrorsForm from "../Error/FormError";


function EditProduct () {
    const params = useParams()
    const [errors, setErrors] = useState({})
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [inputs, setInputs] = useState("")
    const [img, setImg] = useState({})
    const [checkbox, setCheckbox] = useState([])
    const [files, setFiles] = useState("");


    const dataLogin = JSON.parse(localStorage.responseLogin)
    let accsessToken = dataLogin.success.token
    let config = {
      headers: {
        'Authorization': 'Bearer ' + accsessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }
    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/category-brand')
          .then(response => {
            setCategory(response.data.category);
            setBrand(response.data.brand);
          })
          .catch(err => console.log(err));
      }, []);

    useEffect (() => {
        axios.get('http://localhost/laravel/laravel/public/api/user/product/' + params.id , config)
        .then(response => {
            // console.log(response.data.data);
            setInputs({
                    name: response.data.data.name,
                    price: response.data.data.price,
                    category: response.data.data.id_category,
                    brand: response.data.data.id_brand,
                    company: response.data.data.company_profile,
                    detail: response.data.data.detail,
                    status: response.data.data.status,
                    sale: response.data.data.sale,
                    id_user: response.data.data.id_user,
                })
            setImg(response.data.data.image)
        })
        .catch (err => console.log(err))
    }, [])

      const handleInput = (e) => {
            const nameInput = e.target.name
            const valueInput = e.target.value
            setInputs(state => ({...state, [nameInput]: valueInput}))
      }

      const handleCheckbox = (e) => {
        const valueChecked = e.target.checked
        const valueCheckbox = e.target.value
        if (valueChecked == true) {
           setCheckbox(state => ([ ...state, valueCheckbox ]))   
        } else {
            let unChecked = checkbox.includes(valueCheckbox)
            if (unChecked) {
                let result = checkbox.filter((elem) => {
                    return elem != valueCheckbox;  
                 })
                 setCheckbox(result)
            }
        }
      }
      
      const handleInputFiles = (e) => {
        const files = (e.target.files);
        setFiles(files)
      }
    
      function renderCatelogy() {
        if(category.length > 0) { 
            return category.map((value, key) => {
                return (
                    <option value={value.id}>{value.category}</option>
                )
            })
        }   
      }

      function renderBrand() {
        if(brand.length > 0) { 
            return brand.map((value, key) => {
                return (
                    <option value={value.id}>{value.brand}</option>
                )
            })
        }   
      }
      function renderSale() {
        if (inputs.status == 1) {
          return (
            <input
              value={inputs.sale}
              name="sale"
              type="text"
              placeholder="0%"
              onChange={handleInput}
            />
          )
        }
      }

      function renderImage () {
        if (img.length > 0) { 
            return img.map((value, key) => {
                return(
                <li>
                    <img
                        key={key}
                        width={"50px"} height={"50px"}
                        src={'http://localhost/laravel/laravel/public/upload/user/product/' + inputs.id_user + '/' + value}
                        alt=""
                    />  
                
                    <input 
                        name="check"
                        type="checkbox" 
                        onChange={handleCheckbox}
                        value={value}
                    />
                </li>           
                )       
            })
        }
      }
      function rennderForm () {
        if (Object.keys(inputs).length > 0) {
            return (
                <div className="col-sm-8">
                <div className="signup-form">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit} action="#" encType="multipart/form-data" >

                    <input
                        value={inputs.name}
                        name="name" 
                        type="text" 
                        onChange={handleInput}
                        placeholder="Name"
                    />

                    <input 
                        value={inputs.price}
                        name="price" 
                        type="text"                
                        placeholder="Price"
                        onChange={handleInput}
                    />

                    <select 
                        name="category"
                        onChange={handleInput}
                        value={inputs.category}>
                        <option value="">Please choose category</option>
                        {renderCatelogy()}
                    </select>

                    <select 
                        name="brand"
                        onChange={handleInput}
                        value={inputs.brand}>
                        <option value="">Please choose brand</option>
                        {renderBrand()}
                    </select>

                    <select
                        onChange={handleInput}
                        name="status"
                        value={inputs.status}
                        >
                        <option value='0'>
                            new
                        </option>
                        <option value='1'>
                            sale
                        </option>
                    </select>
                    {renderSale()}

                    <input
                        name="company"
                        value={inputs.company}
                        type="text"
                        onChange={handleInput}
                        placeholder="Company profile"
                    />

                    <input 
                        name="avatar" 
                        type="file" 
                        placeholder="Avatar"
                        multiple
                        onChange={handleInputFiles} 
                    />
                   <ul>{renderImage()}</ul>    
                    
                    <textarea
                        id="text-product"
                        value={inputs.detail}
                        onChange={handleInput}
                        name="detail"
                        rows={11} defaultValue={""}
                        placeholder="detail"
                    />
                    <ErrorsForm errors={errors} />
                    <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
            )
        }
      }

    function handleSubmit (e) {
        e.preventDefault();
        let flag = true;
        let errors = {}
        if (inputs.name =="") {
            errors.name = "name khong duoc de trong"
            flag = false;
        }

        if (inputs.price =="") {
            errors.name = "price khong duoc de trong"
            flag = false;
        }

        if (inputs.category =="") {
            errors.name = "vui long chon category"
            flag = false;
        }

        
        if (inputs.brand =="") {
            errors.name = "vui long chon brand"
            flag = false;
        }

        if (inputs.company =="") {
            errors.name = "vui long chon company"
            flag = false;
        }

        if (files == "") {
            errors.file = "vui long chon file"
            flag = false;
        } else {
            let amoutImage = img.length - checkbox.length
            let totalImage = amoutImage + files.length
            if (totalImage > 3) {
                errors.image = "So luong file > 3"
                flag = false;
            }   
        }

        if (!flag) {
            setErrors(errors)
        } else {
            setErrors("")
            let url = 'http://localhost/laravel/laravel/public/api/user/edit-product/' + params.id;
            const formData = new FormData()
            formData.append('name', inputs.name)
            formData.append('price', inputs.price)
            formData.append('category', inputs.category)
            formData.append('brand', inputs.brand)
            formData.append('company', inputs.company)
            formData.append('detail', inputs.detail)
            formData.append('status', inputs.status)
            formData.append('sale', inputs.sale)

            checkbox.map((value, key) => {
                formData.append("avatarCheckBox[]", value)
            });
        
            Object.keys(files).map((item, i) => {
                let imgType = ["png", "jpg", "jpeg", "PNG", "JPG"];
                const checkFile = {
                    size: files[item].size,
                    type: files[item].type,
                    name: files[item].name,
                  }

                let arrTypeImage = files[item].type.split("/");
                let imageFormat = arrTypeImage[1];
                if (!imgType.includes(imageFormat)) {
                    errors.files = 'sai dinh dang';
                    flag = false;
                } 

                if (checkFile.size > 1024 * 1024) {
                    errors.file = " size > 1024";
                    flag = false;
                } else {
                    formData.append("file[]", files[item])
                }
            })
            
            axios.post(url, formData, config)
            .then(response => {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    setErrors('')
                    console.log(response.data);
                }
            })
            .catch(err => console.log(err))
        }
    }


    return (
         <>
           {rennderForm()}
        </>
    )
}
export default EditProduct;