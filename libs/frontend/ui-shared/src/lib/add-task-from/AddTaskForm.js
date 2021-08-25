import React from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width:220px;
    display:flex;
    flex-direction: column;
    background-color:white;
`;

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
                <Container >   
                    <label>Title : </label>   
                    <input type="text" placeholder="Enter Title" name="Title" required />  
               </Container>
                <Container>
                    <label>Content : </label>   
                    <input type="text" placeholder="" name="content" required />  
                </Container>
                <Container>
                    <button type="submit" onClick={props.handleClose}>Create</button> 
                </Container>
      </div>
    </div>
  );
};

export default Popup;