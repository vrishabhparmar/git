import { Button, Input } from '@material-ui/core'
import React,{useState} from 'react'
import {db, storage} from '../firebase.js'
import firebase from 'firebase';
import '../css/image-upload.css'

// / declaring state variables

 
function ImageUpload({username}) {

const [image, setImage] = useState(null)
 const [progress, setprogress] = useState(0)
 const [caption, setCaption] = useState('')



 const handleChange = (e) => {
    if(e.target.files[0])
   {
       setImage(e.target.files[0]);
   }

 }

 const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // once the upload progress give me snapshots of the progress
            const progres = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setprogress(progres);
        },
        (error) => {
            console.log(error);
            alert(error.message);

        },
        () => {
            // complete function 
            storage  // storage goes to th ref images 
            .ref("images") 
            .child(image.name) // look for the specifeid image 
            .getDownloadURL() // and download the URL for that image 
            .then( url => {

                db.collection("post").add({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    caption : caption,
                    imgUrl : url,
                    username: username
                });

                setprogress(0);
                setCaption("");
                setImage(null);

            })
        }
    );
 }

    return (
        <div className="Image-upload">
            <progress className="input" value={progress} max="100" />
            <Input className="input" onChange={(e) => setCaption(e.target.value)} type="text" value={caption}
            placeholder="Caption here..."/>
            <Input className="input" onChange={handleChange} type="file"/>
            <Button className="input" onClick={handleUpload} variant="contained" color="primary">
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
