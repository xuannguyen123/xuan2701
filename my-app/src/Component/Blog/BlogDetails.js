import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ListComments from "./ListComments";
import Rating from "./Rating";
import Comment from "./Comment";

function BlogDetails (props) {
    let params = useParams();
    const [data, setData] = useState('')
    const [idComment, setIdComment] = useState('')
    const [listComments, setListComments] = useState({})

    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/blog/detail/' + params.id)
        .then(response => {
            setListComments(response.data.data.comment);
            setData(response.data.data);
        })
        .catch(err => console.log(err))
    }, [])
    
    function fetchData () {
        if (Object.keys(data).length > 0) {
                return (
                    <div className="single-blog-post">
                        <h3>{data.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                        </div>
                            <a href>
                                <img src={'http://localhost/laravel/laravel/public/upload/Blog/image/' + data.image}  alt="" />
                            </a>
                            <p>{data.content}</p> <br />
                            <p>{data.description}</p> <br />
                       
                    </div>
                )
        }
    }

    // get new cmt
    function getComments(data)  {
      let newCmt = [...listComments, data]
      setListComments(newCmt)
    }

    // get ID comment Reply
    function getIdCmt(id) {
      setIdComment(id)
    }

    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                    {fetchData()}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
                <div className="rating-area">
                  <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <li>
                      <i className="fa fa-star color" />
                      <i className="fa fa-star color" />
                      <i className="fa fa-star color" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                    </li>
                    <li className="color">(6 votes)</li>
                  </ul>
                  <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href>Pink <span>/</span></a></li>
                    <li><a className="color" href>T-Shirt <span>/</span></a></li>
                    <li><a className="color" href>Girls</a></li>
                  </ul>
                </div>
                <div className="socials-share">
                  <a href><img src="images/blog/socials.png" alt="" /></a>
                </div>
                <Rating />
                <ListComments 
                   listComments={listComments}
                   getIdCmt={getIdCmt}
                />

                <Comment 
                  getComments={getComments}
                  idComment={idComment}
                />


              </div>	
            </div>
          </div>
        </section>
      </div>
    );
}

export default BlogDetails