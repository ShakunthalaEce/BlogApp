import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PostCard from "./PostCard";

const DisplayPost = () => {

  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchData=async () =>{
      const res=await fetch("https://blogapp-nnb7.onrender.com/api/blog/",{
        method:"GET",
        headers:{
          token:localStorage.getItem("token")
        }
      })
      const data=await res.json()
      if(res.ok)
      {
        setPosts(data);
      }
     else{
      console.log(data);
    }
  }
    fetchData();
  },[posts])
  // const post = [
  //   {
  //       id:1,
  //     title: "This is title 1",
  //     content: "This is content 1",
  //     image:
  //       "https://cdn.mos.cms.futurecdn.net/yqstvZeqTEzFSeU3oxMGyP-1200-80.jpg",
  //     user: "Ammu",
  //     timestamp: "2 days ago",
  //   },
  //   {
  //       id:2,
  //       title: "This is title 2",
  //     content: "This is content 2",
  //     image:
  //       "https://photzy.com/assets/flower-729512_1920-1024x678.jpg.optimal.jpg",
  //     user: "Ramu",
  //     timestamp: "1 days ago",
  //   },
  // ];
  return (
    <Box
      sx={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: 3,
        py:3
      }}
    >
       {posts && posts.map(post=>(
        <PostCard key={post._id} post={post}/>
       ))} 
    </Box>
  );
};

export default DisplayPost;
