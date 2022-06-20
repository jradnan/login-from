import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import app from './Loginform';
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState ('')
  const [password, setPassword] = useState('')
  const [gmail, sendGmail] = useState ('')
  const [reset, setReset] = useState('')

  const handleNameBlur = event =>{
    console.log(event.target.value)
  }

  const handleEmailBlur = event =>{
    setEmail(event.target.value)
  }
  const handlePasswordlBlur = event =>{
    setPassword(event.target.value)
  }
  const handleFormSubmit = event =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }
    
    setValidated(true);




    if(registered){
      signInWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
       
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    }
   
    else{
      createUserWithEmailAndPassword (auth, email,password)
      .then(result =>{
        const user = result.user;
        setEmail('')
        setPassword('')
        emailVarification()
        console.log(user)
      })
      .catch(error=>{
        console.error(error);
        
      })
    }
  
    event.preventDefault();
    
  }

  const handleRegisteredChange = event =>{
    setRegistered(event.target.checked)
  }

  const emailVarification = () =>{
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
      sendGmail('A mail has been sent')
    });
    }
  const resetPassword = () =>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      setReset ('Password reset email has been sent')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // ..
    });
  }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h1 className='text-primary'>Please {registered ?'Login': 'Register'}</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {!registered &&<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control required onBlur={handleNameBlur} type="text" placeholder="Enter Your Name" />
            
            <Form.Control.Feedback type='invalid'>
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type='invalid'>
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onBlur={handlePasswordlBlur} type="password" placeholder="Password" />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
              <Form.Group className="mb-3"         controlId="formBasicCheckbox">
              <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Allready Registered?" />
             </Form.Group>
           <Button onClick={resetPassword} variant="link">Reset password?</Button>
          <Button  variant="primary" type="submit">
            {registered ? 'Login' :  'Register' }
          </Button>
        </Form>
        <div className='mt-5'><h1 className='text-danger'>{gmail}</h1></div>
        <div><h4 className='text-danger'>{reset}</h4></div>
      </div>
    </div>
  );
}

export default App;
