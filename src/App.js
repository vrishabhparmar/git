import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Header from './component/Header';
import Posts from './component/Post';
import {db, auth} from './firebase.js'
import {Button, FormControl, Input, InputLabel} from '@material-ui/core'
import ImageUpload from './component/ImageUpload'
import InstagramEmbed from 'react-instagram-embed';


function App() {

  const [posts, setPost] = useState([]);


  useEffect(() => {

    db.collection('posts').onSnapshot( onSnapshot => {
      setPost(onSnapshot.docs.map( doc => (
        {
          id:doc.id,
          post: doc.data()
        })))
    })
  }, [])


  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }


  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: 'white',
      minHeight : '400px',
      
      padding: theme.spacing(2, 4, 3),
    },
    img : {
      width: 110,
      height: 55,
      margin : ' 10px auto'

    },
    modal : {
      display : 'flex',
      flexDirection: 'column'
    },
    form : {
      display : 'flex',
      flexDirection: 'column',
      justifyContent:'space-between'

    },
    form_elements : {
      margin: '10px 0'
    }
  }));


  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const[openSignIn , setSignIn] = React.useState(false);
  
  const [username, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);


  useEffect(() => {
    // if we see any Auth changes this will be fired 
   const unsubscribe =  auth.onAuthStateChanged((authUser) => {
      if(authUser){
          console.log(authUser);
          setUser(authUser);

      }
      else{
      
        setUser(null)
      }
    })


    return () => {
        unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('post').onSnapshot(snapshot => {

      // every time a new post is added, this code fires...
        setPost(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        })))
    })
  }, [])
 


  const handleChange = () => {

  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSignInOpen = () => {
    setSignIn(true);
  };

  const handleSignInClose = () => {
    setSignIn(false);
  };


  const signUP = (e) => {

      
      e.preventDefault();
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username 
        }) 
      })
      .catch((error) => {
        alert(error.message);
      })

      setInterval(() => handleClose(), 1000)
      
       

  }

  const signIn = (e) => {
      e.preventDefault();

      auth.signInWithEmailAndPassword(email, password)
      
      .catch((error)=> {
        alert(error.message)
      })

      setInterval(() => handleSignInClose(), 1000)
      
  }


  const handleLogOut = () => {
     
      auth.signOut();
      window.location.reload(false);
      
  }





  

  return (
    <div className="App">

      
{/* First modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div className={classes.modal}>
                <img className={classes.img}
                          src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg"
                          alt="instagram"
                />
              
                <div >
                    <form className={classes.form} noValidate autoComplete="off">
                      <FormControl className={classes.form_elements}>
                        <InputLabel htmlFor="username">User name</InputLabel>
                        <Input id="username" inputProps={{ 'aria-label': 'description' }}
                        onChange={(e) => setUserName(e.target.value)}
                        value={username} />

                      </FormControl>


                      <FormControl className={classes.form_elements}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" inputProps={{ 'aria-label': 'description' }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />

                      </FormControl>
                      
                      <FormControl className={classes.form_elements}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" inputProps={{ 'aria-label': 'description' }}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}  />
                      </FormControl>
                    
                    {
                     
                      <Button variant="contained" color="primary" className={classes.form_elements}
                        onClick={signUP}>
                          Sign Up
                        </Button>
                    }
                      
                    </form>
                </div>
            </div>
            
          
          </div>
        </Modal>

 {/* Second Modal        */}

        <Modal
          open={openSignIn}
          onClose={() => setSignIn(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <div className={classes.modal}>
                <img className={classes.img}
                          src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg"
                          alt="instagram"
                />
              
                <div >
                    <form className={classes.form} noValidate autoComplete="off">
                     
                      <FormControl className={classes.form_elements}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" inputProps={{ 'aria-label': 'description' }}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />

                      </FormControl>
                      
                      <FormControl className={classes.form_elements}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" inputProps={{ 'aria-label': 'description' }}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}  />
                      </FormControl>
                    
                   
                      <Button variant="contained" color="primary" className={classes.form_elements}
                        onClick={signIn}>
                          Sign in
                      </Button>
                    
                      
                    </form>
                </div>
            </div>
            
          
          </div>
        </Modal>

        
     <div className="app-header">
       
       <Header/>
       <div className="buttons">
      {
                user ?
                 <Button  className={classes.form_elements}
                  onClick={handleLogOut}>Logout</Button>
                :
                <div>
                          <Button  className={classes.form_elements}
                          onClick={handleOpen}>
                            Sign Up
                          </Button>
                          {'   '}
                          <Button className={classes.form_elements}
                          onClick={handleSignInOpen}>
                            Sign In
                          </Button>
                </div>
              }
      </div>

            
      </div>
      <div className="upper-padding">

      </div>
     
            

     
     {/* this is a optional channing operator which is similar to . operator 
     but it checks if the chaining parameter is not null */}
     <div  className="image-uplaod-section">
     {
        user?.displayName ? 
        <ImageUpload username={user.displayName}/>
        :
        <h2>Sorry you need to login</h2>
      }
      </div>
      <div className="posts-section">
      {
        posts.map( ({id, post}) => {
         return ( <Posts username={post.username} 
          caption={post.caption}
          imageUrl={post.imgUrl}
          key={id}
          postId={id}
          user={user}
          />)
        })
      }
     </div>
     <div className="insta-embed">
     <InstagramEmbed
     className="InstagramEmbed"
        url='https://instagr.am/p/Zw9o4/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
     </div>
      
      



      

     
        
     
    </div>
  );
}

export default App;
