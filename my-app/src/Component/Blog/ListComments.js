
function ListComments (props) {
    const listComments = props.listComments;

    function renderComments () {
        if ((listComments).length > 0) {
            return listComments.map((value, key) => {
                if (value.id_comment == 0) {
                  return (
                    <>
                      <li className="media" key={key}>
                          <a className="pull-left" href="#">
                            <img className="media-object" 
                            src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + value.image_user}
                            alt="" />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li><i className="fa fa-user" />{value.name_user}</li>
                              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <p>{value.comment}</p>
                            <a className="btn btn-primary" onClick={idComment} id={value.id} href="#cmt"><i className="fa fa-reply" />Replay</a>
                          </div>
                      </li>

                      {listComments.map((value2, key2) => {
                        if (value2.id_comment == value.id) {
                          return (                  
                              <li className="media second-media">
                                <a className="pull-left" href="#">
                                  <img className="media-object"
                                   src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + value2.image_user}
                                  alt="" />
                                </a>
                                <div className="media-body">
                                  <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user" />{value2.name}</li>
                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                  </ul>
                                  <p>{value2.comment}</p>
                                  <a className="btn btn-primary" href="#cmt"><i className="fa fa-reply" />Replay</a>
                                </div>
                            </li>
                          )
                        }
                      })}
                    </>
                  
                  )
                }
            })
          
        }
    }    

    // Get id
    function idComment (e) {
        let idComment = e.target.id;
        props.getIdCmt(idComment);
    }


    return (
        <div className="response-area">
        <h2>3 RESPONSES</h2>
        <ul className="media-list">
          {renderComments()}
        </ul>					
      </div>
    )
}

export default ListComments;