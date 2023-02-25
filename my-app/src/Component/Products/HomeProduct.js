import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeProduct () {
    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/product')
        .then(response => {
            setData(response.data.data);
        })
        .catch(err => console.log(err))
    }, [])

    function fetchData () {
        if (data.length > 0) {
            return data.map((value, key) => {
              let img = JSON.parse(value.image)
               return (
                <div className="col-sm-4">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + '/' + img[0] } alt="" />
                        <h2>${value.price}</h2>
                        <p>{value.name}</p>
                        <a href="#"  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                    </div>
                        <div className="product-overlay">
                        <div className="overlay-content">
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" id={value.id} onClick={getIdProduct} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to 09-9-cart</a>
                        </div>
                        </div>
                    </div>
                    <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                        <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                        <li><Link to={"/product/detail/" + value.id}><i className="fa fa-plus-square" />Detail</Link></li>
                        </ul>
                    </div>
                    </div>
                </div>
               )
            })
        }
    }

    function getIdProduct (e) {
      let id = e.target.id;
        let yy = 1;
        let products = {}
        products[id] = 1;
        // localStorage.setItem('products', JSON.stringify(products));


        let newProduct = {}
        newProduct = JSON.parse(localStorage.products)
        if (newProduct[id]) { 
          newProduct[id] += 1
          console.log(1);
          yy = 2;
        }
        if ( yy == 1) {
          console.log(2);
          newProduct[id] = 1;
        }
        
        localStorage.setItem('products', JSON.stringify(newProduct));

    }
    
    return (
            <div className="container">
              <div className="row">
                <div className="col-sm-9 padding-right">
                  <div className="features_items">
                    <h2 className="title text-center">Features Items</h2>
                    {fetchData()}
                  </div>
                </div>
              </div>
            </div>
          );
}

export default HomeProduct;