import react, {useState,useEffect} from "react";

const Image=(props)=>{
    const [imgSrc,setImgSrc]=useState("");
    useEffect(() => {
        const reader=new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend=()=>{setImgSrc(reader.result);}
    },[props.blob]);  
console.log("fff");
    return(
        <img style={{width:150 ,height:"auto"}} src={imgSrc} alt={props.fileName}></img>
    );
}
export default Image;