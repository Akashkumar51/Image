import React, { useState,useEffect } from 'react'
import "./Post.css"
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Post() {

    const [image, setImage] = useState('')
    console.log(image,10);
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [data, setData] = useState('')
    const navigate = useNavigate()
    // const navigate = useNavigate()

    function PostData(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',image)
        formData.append('title',title)
        formData.append('subject',subject)
        if (title !== "" && subject !== "" && image !== "") {
            axios.post("http://localhost:8000/post-create", formData)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.message) {
                        setData(response.data.message)
                        console.log(response.data.message);
                        navigate("/allpost")
    
                    } else {
                        setData("Please Try Again")
                    }
    
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            }else {
                setData("Please enter all values")
            }
}

useEffect(() => {
    axios.post("http://localhost:8000/token-verify", { token: Cookies.get("token") })
        .then(function (response) {
            // handle success
            if (response.data.data !== undefined) {
                console.log(response.data.data);
                Navigate('/allpost')
            } else {
            }
        })
}, [])

return (
    <div className='post'>
        {data === "" ?
        <form onSubmit={PostData} className='post-account'>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className='post-image' />
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} className='post-title' />
            <input type="text" placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} className='post-subject' />
            <button type='submit' className='post-submit'>Submit</button>
        </form>
          :
          <h3 className='post-data'>{data}</h3>
      }
    </div>
)
}

export default Post