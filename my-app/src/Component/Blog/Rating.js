import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ErrorsForm from "../Error/FormError";

function Rating () {
    const params = useParams()
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})

    useEffect(() => {
      axios.get('http://localhost/laravel/laravel/public/api/blog/rate/' + params.id)
      .then(response => {
         const dataRate = response.data.data
        //  DATA = OBJ
        if (Object.keys(dataRate).length > 0) {
         let sum = 0
          Object.keys(dataRate).map((key, index) => {
              sum = sum + dataRate[key].rate
          })
          let tbc = sum / Object.keys(dataRate).length
          setRating(tbc);
        }

        //  DATA = ARR
        if (dataRate.length> 0) {
          let sum = 0
          dataRate.map((value, key) => {
            sum = sum + value.rate
          })
          let tbc = sum / dataRate.length
          setRating(tbc);
        }

      })

      .catch (err => console.log(err))
    },[])

    function changeRating( newRating,name ) {

       setRating(newRating)
        let flag = true;
        let ratingError = {}
        let getLocalLogin = JSON.parse(localStorage.responseLogin)
        if (!getLocalLogin) {
          ratingError.login = "Vui long login";
          flag = false;
        } else {
          ratingError.login = "";
        } 

        if (!flag) {
          setErrors(ratingError)
        } else {
          let url = 'http://localhost/laravel/laravel/public/api/blog/rate/' + params.id;
          let accessToken = getLocalLogin.success.token
          let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
          }
          const formData = new FormData();
          formData.append('user_id', getLocalLogin.Auth.id)
          formData.append('blog_id', params.id)
          formData.append('rate', newRating)

          axios.post(url, formData, config)
          .then(response => {
            if (response.data.errors) {
               setErrors(response.data.errors)
            } else {
              console.log('Danh gia thanh cong')
            }
          })
          .catch(err => console.log(err))
        }
    }

    return (
      <>
           <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
          />
        <ErrorsForm errors={errors}/>
      </>
   
      );
}


export default Rating;