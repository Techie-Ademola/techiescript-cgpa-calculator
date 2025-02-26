import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
// import './Main.css'
import { Context } from "../../context/Context";
import { copyToClipboard } from "../../utils/index";

const ChatScreen = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    responses,
  } = useContext(Context);

  const mainContainerRef = useRef(null);

  //   useEffect(() => {
  //     if (mainContainerRef.current) {
  //       mainContainerRef.current.scrollTop =
  //         mainContainerRef.current.scrollHeight;
  //       mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, [responses]);

  const handleCardClick = (promptText) => {
    setInput(promptText);
    onSent(promptText);
  };

  const handleSubmit = () => {
    // input.length < 1 ? null : onSent();

    if (input.length > 0) {
      setInput("");
      onSent();

      setTimeout(() => {
        if (mainContainerRef.current) {
          mainContainerRef.current.scrollTop =
            mainContainerRef.current.scrollHeight;
          mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    } else {
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      handleSubmit();
    }
  };

  return (
    <div className="main chat_screen position-relative">
      <div className="nav">
        <p className="mb-0">AI Chat</p>

        <div>
          {/* <button></button> */}
          {/* <img src={assets.user_icon} alt="" /> */}
          <img src={assets.chat_user} alt="" />
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Tasuedite.</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards row px-3">
              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("What are the main topics covered in my course of study?")
                  }
                >
                  <p>What are the main topics covered in my course of study?</p>
                  <img src={assets.gallery_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Are there any tips for preparing for the upcoming exam?"
                    )
                  }
                >
                  <p>Are there any tips for preparing for the upcoming exam?</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("How can I balance my coursework with extracurricular activities?")
                  }
                >
                  <p>How can I balance my coursework with extracurricular activities?</p>
                  <img src={assets.message_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "What skills should I focus on to be better prepared for post-graduation?"
                    )
                  }
                >
                  <p>What skills should I focus on to be better prepared for post-graduation?</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {responses.map((item, index) => (
              <div key={index} className="result">
                <div className="result-title border-bottom pb-2">
                  <img src={assets.chat_user} alt="" />
                  <p
                    className="text-left mb-0"
                    style={{
                      textWrap: "wrap",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {item.prompt}
                  </p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />

                  <div className="w-100">
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item.response }}
                    ></p>
                    <div
                      className="copy_icon"
                      onClick={() => copyToClipboard(item.response)}
                    >
                      <i className="bi bi-copy text-white"></i>
                    </div>
                  </div>
                </div>

                {/* <div key={index}>
                <p>{item.prompt}</p>
                <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
              </div> */}
              </div>
            ))}

            {loading ? (
              <div className="result-data">
                <img
                  className={`${loading ? "isLoading" : ""}`}
                  src={assets.gemini_icon}
                  alt=""
                />
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        <div className="w-100 pt-5" ref={mainContainerRef}></div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
              onKeyDown={handleKeyDown}
            />
            <div
              className="send_icon cursor-pointer"
              onClick={() => handleSubmit()}
              style={{ cursor: "pointer" }}
            >
              {/* <img src={assets.gallery_icon} alt=''/> */}
              {/* <img src={assets.mic_icon} alt=''/> */}

              <img src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info px-3">
            <span className="bottom-info">
              AI chat may display inaccurate info, including about people, so
              double-check its responses.
              {/* Your privacy and AI Chat Apps */}
            </span>
          </p>
        </div>
      </div>

      {/* <button onClick={handleSubmit} className="scroll-to-bottom btn">
        Scroll to Bottom
      </button> */}
    </div>
  );
};

export default ChatScreen;
