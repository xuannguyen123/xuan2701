import Login from "./Login";
import Register from "./Register";

function LoginUser () {
    return (
        <>
         <section id="form">
                <div className="container">
                  <div className="row">
                    <Login />
                    <Register />
                  </div>
                </div>
              </section>
     
        </>
    )
}

export default LoginUser;