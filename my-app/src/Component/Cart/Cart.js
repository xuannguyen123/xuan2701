import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../Context/UserContext";


function Cart () {
    const [product, setProduct] = useState('')
    const value = useContext(UserContext)

    useEffect (() => {
        let getLocal = JSON.parse(localStorage.products)
        if (getLocal) {
            axios.post('http://localhost/laravel/laravel/public/api/product/cart', getLocal)
            .then(response => {
                setProduct(response.data.data);
            })
            .catch(err => console.log(err));
        }
    }, [])

    function CartQuantity () {
        let sum = 0;
        if (product.length > 0) {
            product.map((value, key) => {
                sum = sum + value.qty;
            }) 
        }
        value.CartContext(sum)
    }

    function renderProduct () {
        if (product.length > 0) {
            return product.map((value, key) => {
                let total = value.price * value.qty

                let img = JSON.parse(value.image);
                return(
                    <tr key={key}>
                      <td className="cart_product">
                            <a href="">
                                <img width={"100px"} height={"100px"}
                                    src={'http://localhost/laravel/laravel/public/upload/user/product/' + value.id_user + '/' + img[0]}
                                alt=""/>
                            </a>                   
                        </td>

                        <td className="cart_description">
                            <p>{value.detail}</p>
                        </td>   

                        <td className="cart_price">
                            <p>${value.price}</p>
                        </td>  

                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a  className="cart_quantity_up" onClick={CartQuantityUp} id={value.id} > + </a>
                                  
                                  <input 
                                    key={key} 
                                    type="text" 
                                    className="cart_quantity_input" 
                                    autocomplete="off"
                                    value={value.qty}
                                    size="1">
                                </input>
                                <a className="cart_quantity_down"  onClick={CartQuantityDown} id={value.id} > - </a>
                            </div>
                        </td>

                        <td className="cart_total_price">
                            <p className="cart_total_price">{total}$</p>
                        </td>

                        <td className="cart_delete">
                            <a  className="cart_quantity_delete" onClick={CartDelete}  id={value.id}> <i className="fa fa-times"></i></a>
                        </td>
                    </tr>         
                    
                )
            })
        }
    }

    function CartQuantityUp (e) {
        let id = e.target.id;
        let newProduct = [...product]
        if (newProduct.length > 0) {
            newProduct.map((value, key) => {            
                if (id == value.id) {
                    value.qty += 1
                }
            })
        }
        setProduct(newProduct)

        let newQuantity = {}
        let getLocal = localStorage.getItem("products")
        if (getLocal) {
           newQuantity = JSON.parse(getLocal)
            if(newQuantity[id]) {
                newQuantity[id] += 1;
           }
        }
        localStorage.setItem('products', JSON.stringify(newQuantity))
    }
 
    function CartQuantityDown(e) {
        let id = e.target.id;
        let newProduct = [...product]
            if (newProduct.length > 0) {
                newProduct.map((value, key) => {
                    if (id == value.id) {
                        if (value.qty > 1) {
                            value.qty -= 1
                        } else {
                            delete newProduct[key]
                        }  
                       
                    }
                })
            }
        setProduct(newProduct)


        let newQuantity = {}
        let getLocal = localStorage.getItem("products")
        if (getLocal) {
            newQuantity = JSON.parse(getLocal)
            if (newQuantity[id]) {
                if (newQuantity[id] >= 1) {
                    newQuantity[id] -= 1;
                }
                if (newQuantity[id] == 0) {
                    delete newQuantity[id];
                }
            }        
        }
        localStorage.setItem('products', JSON.stringify(newQuantity))
    }


    function CartDelete (e) {
        let id = e.target.id;
        let newProduct = [...product]
        if (newProduct.length > 0) {
            newProduct.map((value, key) => {
                if (id == value.id) {
                    delete newProduct[key]
                    }
                })
            }
            let result = newProduct.filter((el) => {
                return el != null && el != "";
            });
            setProduct(result)

            let getLocal = localStorage.getItem("products")
                if (getLocal) {
                    let deleteProduct = JSON.parse(getLocal)
                    Object.keys(deleteProduct).map((key, index) => {
                    if (id == key) {
                        delete deleteProduct[key]
                    }
                })
            localStorage.setItem('products', JSON.stringify(deleteProduct));
        }
    }


    function renderTotalPrice() {
        let sum = 0
        if (product.length > 0) {
            product.map((value, key) => {
                let total = value.price * value.qty;
                sum = sum + total;
            })
        }
        return (
            <h3>Tổng Tiền: {sum}$</h3>
        )
    }


    
    return (
        <section id="cart_items">
            <div className="container">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                </div>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description"></td>
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProduct()}
                            {renderTotalPrice()}
                            {CartQuantity()}
                        </tbody>
                    </table>
                </div>  
            </div>
        </section> 
    )
}

export default Cart;