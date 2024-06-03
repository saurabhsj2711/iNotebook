import React from "react";

const Alert = (props) => {


    const capitalize = (word) => {

        if(word==="danger")
        {
            word = "Error";
        }

         return (word.charAt(0).toUpperCase() + word.slice(1))
    }
    
    return (
        <div style={{height:'50px'}}>
        { props.alert && <div class={`alert alert-${props.alert.type}`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>}
        </div>
    )
}

export default Alert;
