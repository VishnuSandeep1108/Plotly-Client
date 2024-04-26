import React, { useEffect } from "react";

import "../styles/home.css";

function Homepage(props)
{
    const {setFileName, setUploaded} = props;
    useEffect(()=>{
        const inputForm = document.getElementById("inputForm");

        function handleSubmit(event) {
            event.preventDefault();
            const inputFile = document.getElementById("fileInput");
            if (inputFile.files.length === 1) {
                const formData = new FormData();
                formData.append("files", inputFile.files[0]);
                fetch("https://plotly-server.onrender.com/saveFile", {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then((data) => {
                    setFileName(data);
                    setUploaded(true);
                })
                .catch((error) => console.log(error));
            }
        }

        inputForm.addEventListener("submit", handleSubmit);

        return () => {
            inputForm.removeEventListener("submit", handleSubmit);
        };

    },[])

    return (
        <div className="homeClass">
           <form id="inputForm">
                <input className="inputFormComponents" type="file" id="fileInput" accept=".csv,.xlsx"></input>
                <button className="inputFormComponents" id="submitButton">Submit</button>
           </form>
        </div>
    )
}

export default Homepage;
