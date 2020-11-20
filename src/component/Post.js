import React, { useState, useEffect} from 'react'
import '../css/post.css';
import Avatar from '@material-ui/core/Avatar'
import {db} from '../firebase.js'
import { Button, Input, FormControl } from '@material-ui/core';
import firebase from 'firebase'



 function Posts({user, postId, username, imageUrl, caption}){
    
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);


    // function to handle comment
    const postComment = (e) => {
        e.preventDefault();

        db.collection("post").doc(postId).collection("comments").add({
            text : comment,
            username : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment("")
    }
    useEffect(() => {
        
        let unsubcribe;
        if(postId)
        {
            unsubcribe = db
            .collection("post")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", 'desc')
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map(doc => doc.data()));
            })
        }

        
        return () => {
           unsubcribe();
        };
    }, [postId])

        return (
          
            <div className="posts">
                
                <div className="post-header">
                
                    <Avatar 
                        className="post-avatar"
                        alt="Vrishabh"
                        src=""
                    />
                    <p className="username">{username}</p>
                    
                </div>
                {/* {header} -> avatar(Material UI) + Username*/ }
                
                <img src={imageUrl} 
                alt="" className="post-image"/>

                {/* {username + caption} */}
                <p className="caption"><strong>{username}</strong> {caption}</p>
                <div className="comments-section">
                    {
                        comments.map(com => (
                            <p>
                                <strong>{com.username}</strong> {com.text}
                            </p>
                        ))
                    }

                </div>

                {
                    user ?
                    <div className="comment-form">
                  
                        <Input
                            className="post-input"
                            type="text"
                            placeholder="Add a comment.."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <Button 
                        className="post-button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                        >
                            Post
                        </Button>
                     

                        
                  
                    </div>
                :
                    ""
                }
                
                
            </div>
          
            
        )
    }


export default Posts
