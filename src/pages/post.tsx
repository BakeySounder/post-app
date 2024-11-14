import { useEffect, useState } from "react"
import { Header } from "../components/header"
import styles from "./../css/post.module.css"
import { IPost } from "../interfaces/IPost"
import { When } from "../components/when"
import { useSearchParams } from "react-router-dom"
import { IUser } from "../interfaces/IUser"
import { IComment } from "../interfaces/IComment"
export const Post: React.FC = () => {
  const [post, SetPost] = useState<IPost>()
  const [author, setAuthor] = useState<IUser>()
  const [comments, setComments] = useState<IComment[]>()
  const [params] = useSearchParams()
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts?id="+params.get("postId"))
    .then(res=>res.json())
    .then(data=>{
      
      SetPost(data.length >0 ? data[0] : undefined)
      return data
    }).then((data)=>{
      console.log("fetching after post info");
      
      fetch("https://jsonplaceholder.typicode.com/users?id="+data[0]?.userId)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        
        setAuthor(data.length >0 ? data[0] : undefined)
      }).catch(err=>{
        console.log(err);
      })

      fetch("https://jsonplaceholder.typicode.com/comments?Postid="+data[0]?.id)
      .then(res=>res.json())
      .then(data=>{
        // console.log(data);
        
        setComments(data.length >0 ? data : undefined)
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
  },[])
  // console.log(post);
  
  return (
    <div className={styles.Post}>
      <Header/>
      <div className={styles.body}>
        <When style={{display:"flex", flexDirection:"column"}} condition = {!!post && !!author }>
          <div className={styles.PostBody}>
            <h3>Title: {post?.title}</h3>
            <span>Post Author: {author?.name}</span><br /><br />
            <span>Post body:</span>
            <p>{post?.body}</p>
          </div>
          <div>
            <h3>Comments:</h3>
            <div className={styles.comments}>
              {comments?.map((comment:IComment)=>(
                <div key = {comment.id} className={styles.comment}>
                  <span>Name: {comment.name}</span><br />
                  <span>Body: {comment.body}</span>
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </When>
      </div>
    </div>
  )
} 