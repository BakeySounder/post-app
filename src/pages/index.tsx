import { useEffect, useState } from "react"
import { Header } from "../components/header"
import styles from "./../css/index.module.css"
import { IPost } from "../interfaces/IPost"
import { When } from "../components/when"
export const Index: React.FC = () => {
  const [posts, SetPosts] = useState<IPost[]>()
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res=>res.json())
    .then(data=>{
      SetPosts(data)
    }).catch(err=>{
      console.log(err);
    })
  },[])
  console.log(posts);
  
  return (
    <div className={styles.index}>
      <Header/>
      <div className={styles.body}>
        <When style={{display:"flex", flexDirection:"column"}} condition = {!!posts}>
          <div className={styles.posts}>
            {posts?.map((post:IPost)=>(
              <button onClick={()=>window.location.href = "/post?postId="+post.id} key={post.id} className={styles.post}>
                <div className={styles.img_replacer}></div>
                <span className={styles.post_title}>{post.title}</span>
                <span className={styles.post_desc}>{post.body}</span>
              </button>
            ))}
          </div>
        </When>
      </div>
    </div>
  )
} 