import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MyProduct () {
    const [data, setData] = useState("")

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
     
        axios.get('http://localhost/laravel/laravel/public/api/user/my-product', config)
        .then((response) => {
            setData(response.data.data);
        })
        .catch((error) => console.log(error))
    }, [])


    function renderProduct() {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((key, index) => {
                    let jsonImage = data[key].image
                    let img = JSON.parse(jsonImage)
                return (
                    <tr key={key}>
                        <td>
                            <p>{data[key].id}</p>
                        </td> 

                        <td>
                            <p>{data[key].name}</p>
                        </td>

                        <td className="cart_product"> 
                            <a href="">
                                <img width={"50px"} height={"50px"}
                                    src={'http://localhost/laravel/laravel/public/upload/user/product/' + data[key].id_user + `/` + img[0]}
                                alt=""/>
                            </a>                   
					    </td>  

                        <td className="cart_price">
                            <p>${data[key].price}</p>
                        </td>

                          <td className="cart_delete">
                            <Link to={"/account/product/edit/" + data[key].id} 
                                className="cart_quantity_edit">
                                <i className="fa fa-edit"> </i>
                            </Link>

                            <a  className="cart_quantity_delete"
                                id={data[key].id}
                                onClick={idProduct}
                            >   
                                <i className="fa fa-times"></i>
                            </a>
                        </td>          
                    </tr>
                )
            })
        }
    }

    function idProduct (e) {
        e.preventDefault();
        let idDelete = e.target.id;
        axios.get('http://localhost/laravel/laravel/public/api/user/delete-product/' + idDelete , config)
        .then(response => {
            setData(response.data.data);
        })
        .catch(err => console.log(err))
    }


    return (
          <>    
            <section id="cart_items">
                <div className="container">
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                            <tr className="cart_menu">
                                <td className="id">Id</td>
                                <td className="name">Name</td>
                                <td className="img">Image</td>
                                <td className="price">Price</td>
                                <td className="action">Action</td>
                            </tr>
                            </thead>
                            <tbody>
                                {renderProduct()}
                            </tbody>
                        </table>
                        <button 
                            type="submit"
                            className="btn btn-primary">POST
                        </button>
                    </div>
                </div>
            </section> 
       
        </>
    )
}
export default MyProduct;