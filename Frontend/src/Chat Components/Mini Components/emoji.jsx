import React from "react";
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Picker  from "emoji-picker-react";
import { EmojiStyle } from 'emoji-picker-react';
const EmojiBox = () => {

  const [inputValue, setInputValue] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji.emoji);  };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div className="headico py-lg-3 d-flex justify-content-center mx-2 align-items-center px-lg-3" ref={ref} onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}>
        {children}
      </div>
      ));
    return (
        <>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}   drop={'up-centered'}  id="dropdown-custom-components" >
            <i className="icon-emotsmile fs-5"></i>
             </Dropdown.Toggle>
      
            <Dropdown.Menu>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Picker  onEmojiClick={onEmojiClick} />
            </Dropdown.Menu>
          </Dropdown>
        </>
      );

    };

export default EmojiBox;