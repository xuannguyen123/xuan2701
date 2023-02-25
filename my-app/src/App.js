import { useLocation } from "react-router-dom";
import Footer from "./Component/Layout/Footer";
import Header from "./Component/Layout/Header";
import MenuAccount from "./Component/Layout/MenuAccount";
import MenuLeft from "./Component/Layout/MenuLeft";
import { UserContext } from "./Component/Context/UserContext";
import { useState } from "react";



function App(props) {
   let param1 = useLocation();
  const [quantity, setQuantity] = useState()
  let a = 1;
   
   function CartContext (data) {
      setQuantity(data);
   }
   
  return (
    <>
        <UserContext.Provider 
             value={{
              quantity,
              CartContext: CartContext
            }} 
        >
            <Header />
            <section>
              <div className="container">
                <div className="row">
                {param1['pathname'].includes("account") ? <MenuAccount /> : <MenuLeft />}
                  {props.children}
                </div>
              </div>
            </section>
        </UserContext.Provider>

          <Footer />    
    </>

  );
}

export default App;
