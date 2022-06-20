import './App.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  const [password, setPassword] = useState('')

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


 

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h1 className='text-primary'>Please {registered ?'Login': 'Register'}</h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
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
          
          <Button  variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
