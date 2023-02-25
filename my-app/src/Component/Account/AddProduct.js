import axios from "axios";
import { useState, useEffect } from "react";
import ErrorsForm from "../Error/FormError";


function AddProduct () {
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [errors, setErrors] = useState({})
    const [avatar, setAvatar] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 0,
        sale: "",
      });

    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/category-brand')
          .then(response => {
            setCategory(response.data.category);
            setBrand(response.data.brand)
          })
          .catch(err => console.log(err));
      }, []);

      const handleInputFiles = (e) => {
        setAvatar(e.target.files);
      }

      const handleInput = (e) => {
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInputs(state => ({ ...state, [nameInput]: valueInput }))
      }

    function renderCatelogy() {
        if (category.length > 0) {
        return category.map((value, key) => {
            return (
                <>
                    <option value={value.id} key={key}>
                        {value.category}
                    </option>     
                </>
                 
            )
        })
        }
    } 

    function renderBrand() {
        if (brand.length > 0) {
            return brand.map((value, key) => {
                return (
                    <>
                        <option value={value.id} key={key}>
                            {value.brand}
                        </option>       
                    </>
                   
                )
            })
        }
    }

    function renderSale() {
        if (inputs.status == 1) {
          return (
            <input
              name="sale"
              type="text"
              onChange={handleInput}
              placeholder="0%"
            />
          )
        }
    }


    function handleSubmit (e) {
        e.preventDefault()
        let flag = true;
        let errors = {}

        if (inputs.name == "") {
            errors.name = "vui long nhap name"
            flag = false;
        }

        if (inputs.price == "") {
            errors.price = "vui long nhap price"
            flag = false;
        }

        if (inputs.category == "") {
            errors.category = "vui long chon danh muc"
            flag = false;
        }

        if (inputs.brand == "") {
            errors.brand = "vui long chon thuong hieu"
            flag = false;
        }

        if (inputs.company == "") {
            errors.company = "vui long chon cong ty"
            flag = false;
        }

        if (inputs.detail == "") {
            errors.company = "vui long nhap detail"
            flag = false;
        }

        if (avatar == "") {
            errors.avatar = "vui long chon avatar"
            flag = false;
        } else if (Object.keys(avatar).length > 3 ) {
            errors.avatar = "so luong file > 3"
            flag = false;
        } 
           

        if (!flag) {
            setErrors(errors)
        } else {
            setErrors('')
            let dataLogin = JSON.parse(localStorage.responseLogin)
            let url = 'http://localhost/laravel/laravel/public/api/user/add-product'
            let accsessToken = dataLogin.success.token
            let config = {
              headers: {
                'Authorization': 'Bearer ' + accsessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              }
            }
            const formData = new FormData()
            formData.append('name', inputs.name)
            formData.append('price', inputs.price)
            formData.append('category', inputs.category)
            formData.append('brand', inputs.brand)
            formData.append('company', inputs.company)
            formData.append('detail', inputs.detail)
            formData.append('status', inputs.status)
            formData.append('sale', inputs.sale)

            Object.keys(avatar).map((item, i) => {
                let imgType = ["png", "jpg", "jpeg", "PNG", "JPG"];
                const checkFile = {
                    size: avatar[item].size,
                    type: avatar[item].type,
                    name: avatar[item].name,
                  }

                let arrTypeImage = avatar[item].type.split("/");
                let imageFormat = arrTypeImage[1];
                if (!imgType.includes(imageFormat)) {
                    errors.avatar = 'sai dinh dang';
                    flag = false;
                } 

                if (checkFile.size > 1024 * 1024) {
                    errors.file = " size > 1024";
                    flag = false;
                } else {
                    formData.append("file[]", avatar[item])
                }
            })
            axios.post(url, formData, config)
            .then(response => {
                if(response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    // console.log(response.data);
                }
            })
            .catch(err => console.log(err))
          
        
         
        }
    }


    return (
        <>
            <div className="col-sm-8">
                <div className="signup-form">
                    <h2>Create Product</h2>
                    <form onSubmit={handleSubmit} action="#" encType="multipart/form-data" >

                    <input
                        name="name" 
                        type="text" 
                        onChange={handleInput}
                        placeholder="Name"
                    />

                    <input 
                        name="price" 
                        type="text"                
                        placeholder="Price"
                        onChange={handleInput}
                    />

                    <select name="category"
                        onChange={handleInput}>
                        <option value="">Please choose category</option>
                        {renderCatelogy()}
                    </select>

                    <select name="brand"
                        onChange={handleInput}>
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

                    <textarea
                        id="text-product"
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
        </>
    )
}
export default AddProduct;