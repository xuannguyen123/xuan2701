import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function HomeProductDetail () {
    const params = useParams()
    const [data, setData] = useState('')
    const [img, setImg] = useState({})
    const [img2, setImg2] = useState({})
    useEffect (() => {
        axios.get('http://localhost/laravel/laravel/public/api/product/detail/' + params.id )
        .then(response => {
            setData(response.data.data);
            let jsonImage = response.data.data.image
            let img = JSON.parse(jsonImage)
            setImg(img[0]);
            setImg2(img)
        })
        .catch(err => console.log(err))
    }, [])


    function renderSliderImg () {
      if (img2.length > 0) {
        return img2.map((value, key) => {
          return (
            <>
               <a href onClick={clickImg}>
                <img width="90px"  name={value} src={"http://localhost/laravel/laravel/public/upload/user/product/" + data.id_user + '/' + value}
                alt="" />
               </a>
            </>
          )
        }) 
      }
    }

    function clickImg(e) {
      let nameImg =  e.target.name
      setImg(nameImg)
    }

    function fetchData () {
        if (Object.keys(data).length > 0) {
            return (
                <div className="container">
                <div className="row">
                  <div className="col-sm-9 padding-right">
                    <div className="product-details">
                      <div className="col-sm-5">
                        <div className="view-product">
                          <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + data.id_user + '/' + img } alt="" />
                          <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                          <div className="carousel-inner">
                            <div className="item active">
                              {renderSliderImg()} 
                            </div>
                           
                          </div>
                          <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                          </a>
                          <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="product-information">
                          <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                          <h2>Anne Klein Sleeveless Colorblock Scuba</h2>
                          <p>Web ID: 1089772</p>
                          <img src="images/product-details/rating.png" alt="" />
                          <span>
                            <span>US $59</span>
                            <label>Quantity:</label>
                            <input type="text" defaultValue={3} />
                            <button type="button" className="btn btn-fefault cart">
                              <i className="fa fa-shopping-cart" />
                              Add to cart
                            </button>
                          </span>
                          <p><b>Availability:</b> In Stock</p>
                          <p><b>Condition:</b> New</p>
                          <p><b>Brand:</b> E-SHOPPER</p>
                          <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>
                      </div>
                    </div>       
                  </div>
                </div>
              </div>
            )
        }
    }

          return (
            <>
                {fetchData()}
            </>        
          );
}

export default HomeProductDetail;