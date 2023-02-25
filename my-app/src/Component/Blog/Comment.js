import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorsForm from "../Error/FormError";



function Comment (props) {
    const idReply = props.idComment;
    const params = useParams()
    const [errors, setErrors] = useState({})
    const [comment, setComment] = useState({
        message: "",
    });

    function handleSubmit (e) {
        e.preventDefault();
        let flag = true;
        let errorComment = {}

        // Ckeck Login******
        const dataLogin = JSON.parse(localStorage.responseLogin)
        if (!dataLogin) {
            errorComment.login = "Vui long login";
            flag = false;
        } else {
            errorComment.login = "";
        }
        
        if (comment.message ==="") {
            errorComment.message ="Vui long nhap comment"
            flag = false;
        } else {
            errorComment.message ="";
        }

        if (!flag) {
            setErrors(errorComment)

        } else {
            let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + params.id
            let accessToken = dataLogin.success.token
            let user = dataLogin.Auth

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formData = new FormData();
            formData.append('id_blog', params.id)
            formData.append('id_user', user.id)
            formData.append('id_comment', idReply ? idReply : 0)
            formData.append('comment', comment)
            formData.append('image_user', user.avatar)
            formData.append('name_user', user.name)

            axios.post(url, formData, config)
            .then(res => {
                props.getComments(res.data.data);

            })
            .catch(err => console.log(err));
            
        }
    }

    function handleText (e) {
        setComment(e.target.value);
    }

    return (
          <div className="replay-box">
                  <div className="row">
                    <div className="col-sm-12">
                      <h2>Leave a replay</h2>
                      <div className="text-area">
                        <div className="blank-arrow">
                          <label>Your Name</label>
                        </div>
                        <span>*</span>

                        <ErrorsForm errors={errors} />
                        <form onSubmit={handleSubmit}>
                            <textarea 
                                id="cmt"
                                name="message" 
                                rows={11} defaultValue={""} 
                                onChange={handleText}
                            />
                        <button type="submit"className="btn btn-primary" href>post comment</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
    )
}

export default Comment;