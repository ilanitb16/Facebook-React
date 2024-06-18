import React, { useState } from "react";

function Share() {
  const [sharePressed, setSharePressed] = useState(false);

  const handleClickShare = () => {
    setSharePressed((pressed) => !pressed);
  };

  return (
    <span className="share-container">
      <span
        className="shareButton"
        onClick={() => {
          setSharePressed(!sharePressed);
        }}
      >
        <i
          className={`bi bi-reply${sharePressed ? "-fill" : ""}`}
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleClickShare}
        ></i>
      </span>

      {sharePressed && (
  <ul className="social-icons">
    <li className="whatsapp">
      <i className="bi bi-whatsapp" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="messenger">
      <i className="bi bi-messenger" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="instagram">
      <i className="bi bi-instagram" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="snapchat">
      <i className="bi bi-snapchat" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="telegram">
      <i className="bi bi-telegram" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="tiktok">
      <i className="bi bi-tiktok" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="twitter">
      <i className="bi bi-twitter" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
    <li className="discord">
      <i className="bi bi-discord" style={{ fontSize: "1.2rem", cursor: "pointer" }}></i>
    </li>
  </ul>
)}

    </span>
  );
}

export default Share;
