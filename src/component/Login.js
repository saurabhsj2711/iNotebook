import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleClick = async(e) => {
        e.preventDefault();

        console.log(credentials);

        try {

        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"email":credentials.email,"password":credentials.password})
        });

        const json = await response.json();

        

        if(json.success){
            
            props.showAlert("Loggedin successfully","success");
            localStorage.setItem('token',json.authToken);

            navigate("/");
        }
        else{
            props.showAlert("Please enter valid details","danger");
        }
        console.log(json);
            
        } catch (error) {
            props.showAlert("Please enter valid details","danger");
            
        }

        

    }

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    return(
        <div className="container">
            <h1>Login to iNotebook</h1>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                    <input type="text" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;