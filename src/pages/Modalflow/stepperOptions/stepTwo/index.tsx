import "./index-dragFile.css";
import { useRef, useState } from "react";
import {v4 as uuid} from "uuid";
import { Button } from "@mui/material";



const DragFile: React.FC = () => {
    const [uploadedFile, setUpLoadNameFile]= useState<FileList | null>(null)
    console.log(uploadedFile);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (): void => {
    if (inputRef && inputRef.current) {
        inputRef.current.click();
    }
    };
    const handleFile =(e :React.ChangeEvent<HTMLInputElement>) =>{
        setUpLoadNameFile(e.target.files)
    }
    

    // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // const files = event.target.files;
    // if(files?.length === undefined) return processFile(files)

    // };

    // const processFile=(file) => {
    //     const  fileReader = new FileReader()
        
    // }

    return (
    <>
    <div className="drager" onClick={handleClick}>
        <h2 className="title-dragger">da click en el boton para subir el imagen</h2>
        <input 
            type="file"
            placeholder="arraste aqui la imagen o de click para ver opciones"
            className="drager-dragFileInput"
            onChange={(e)=>{handleFile(e)}}
            ref={inputRef}
            multiple
        />
        <Button
        size="large"
        variant="contained"
        style={{width:"300px", alignSelf:"center"}}
        >
        guardar
        </Button>
        </div>
    </>
    );
};

export { DragFile };
