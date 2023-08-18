import React, { useState, useEffect } from 'react'
import "./Allpost.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Allpost() {

    const navigate = useNavigate()
    const [allPosts, setAllPosts] = useState([])
    const [userData, setUserData] = useState("")

    useEffect(() => {
        axios.post("http://localhost:8000/token-verify", { token: Cookies.get("token") })
            .then(function (response) {
                // handle success
                if (response.data.data !== undefined) {
                    setUserData(response.data.data)
                    console.log(response.data.data);
                }
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/all-posts",)
            .then(function (response) {
                // handle success
                setAllPosts(response.data.data)
                console.log(response.data.data);
            })
    }, [])

    return (
        <div className='allpost'>
            {allPosts.length > 0 ? allPosts.map((data, index) => (
                <div key={index} className='allpost-page'>
                    <img src={`http://localhost:8000/${data.image}`} alt="" className='allpost-image' />
                    <div className='allpost-title' >{data.title}</div>
                    <div className='allpost-subject'>{data.subject}</div>
                </div>
            )) : "No Post..."}
        </div>
    )
}

export default Allpost