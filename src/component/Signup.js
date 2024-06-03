import React from "react";
import { useState } from "react";

const Signup = (props) => {

    const [user,setUser] = useState({email:"",name:"",password:"",cpassword:""});

    const handleClick = async (e) =>{

        e.preventDefault();

        console.log(user);

        if (user.password===user.cpassword)
        {
            const response = await fetch("http://localhost:5000/api/auth/createuser",{
                method : "POST",
                headers :{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email:user.email,name:user.name,password:user.password})
            });

            const json = await response.json();

            if(json.success){
                console.log("User created successfully", json);
                props.showAlert("User created successfully","success");
            }
            else{
                props.showAlert(json.error,"danger");
            }

            
        }
    }

    const onChange = (e) => {

        setUser({...user,[e.target.name]:e.target.value});

    }
    return(
        <div className="container mt-2">
            <h1>Create a account</h1>
            <form>
                <div className="mt-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="text" className="form-control" id="email" name="email" value={user.email} aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={user.cpassword} onChange={onChange} required />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Signup;