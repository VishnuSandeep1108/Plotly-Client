import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';

import "../styles/graph.css";

function Plotpage(props) {
    const {fileName, iteration, updateIteration } = props;
    const [plotData, setPlotData] = useState(null);
    const [lastIteration, setLastIteration] = useState(false);
    let startX;

    const handleMouseDown = (event) => {
        if (event.button === 0) {
            startX=event.clientX;
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
        }
    };

    const mouseUpHandler = (event) => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (event) => {
        let currentX = event.clientX;
        let deltaX = currentX - startX;
        mouseUpHandler();
        if (deltaX > 0) {
            if(lastIteration===false)updateIteration(iteration + 1);
        } else if (deltaX < 0) {
            if (iteration > 0) updateIteration(iteration - 1);
        }
    };

    useEffect(() => {
        const deleteFiles = (event) => {
            const params = {
                fileName: fileName
            };
    
            const queryString = new URLSearchParams(params).toString();
    
            const url = `https://plotly-server.onrender.com/deleteFile?${queryString}`;
            fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log("File deleted successfully");
                } else {
                    console.error("Failed to delete file");
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
        }

        window.addEventListener("unload", deleteFiles);

        const params = {
            fileName: fileName,
            iteration: iteration
        };

        const queryString = new URLSearchParams(params).toString();

        const url = `https://plotly-server.onrender.com/extractData?${queryString}`;


        fetch(url)
            .then(response => response.json())
            .then((data) => {
                // const newDate = new Date();
                // console.log(newDate);
                if(data[2]===true)
                setLastIteration(true);
                else
                setLastIteration(false);
                setPlotData({
                    x: data[0],
                    y: data[1],
                    mode: 'lines+markers',
                    type: 'scatter'
                });
            });

            return () => {
                window.removeEventListener("unload", deleteFiles);
            };

    }, [iteration]);

    return (
        <div className="plotClass" onMouseDown={handleMouseDown}>
        <h1>{iteration}<sup>th</sup> Iteration</h1>
            {plotData && (
                <Plot
                    data={[plotData]}
                    layout={{
                        margin: { t: 0 },
                        xaxis: { fixedrange: true },
                        yaxis: { fixedrange: true }
                    }}
                    config={{ scrollZoom: false }}
                />
            )}
        </div>
    );
}

export default Plotpage;
