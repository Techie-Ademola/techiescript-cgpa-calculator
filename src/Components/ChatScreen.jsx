import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
// import './Main.css'
import { Context } from "../context/Context";

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

  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop =
        mainContainerRef.current.scrollHeight;
      mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  const handleCardClick = (promptText) => {
    setInput(promptText);
    onSent(promptText);
  };

  const scrollToBottom = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop =
        mainContainerRef.current.scrollHeight;
      mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="main chat_screen position-relative">
      <div className="nav">
        <p className="mb-0">AI Chat</p>

        <div>
          {/* <button></button> */}
          {/* <img src={assets.user_icon} alt="" /> */}
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-wvomdMC7MsytJXsaJXl4FLQUfTpr3Rdyw&s`}
            alt=""
          />
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
            <div className="cards row px-4">
              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("Suggest Some Place To Visit In Kerala")
                  }
                >
                  <p>Suggest beautiful places to see an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Brainstorm team bonding activities for our work retreat"
                    )
                  }
                >
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick("How to Create a Gyroscope using Disc?")
                  }
                >
                  <p>How to Create a Gyroscope using Disc?</p>
                  <img src={assets.message_icon} alt="" />
                </div>
              </div>

              <div className="col-6 col-md-3 px-2 py-2">
                <div
                  className="card"
                  onClick={() =>
                    handleCardClick(
                      "Create a Script for the youtube video about coding"
                    )
                  }
                >
                  <p>Create a Script for the youtube video about coding</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {responses.map((item, index) => (
              <div className="result">
                <div className="result-title border-bottom pb-2">
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-wvomdMC7MsytJXsaJXl4FLQUfTpr3Rdyw&s`}
                    alt=""
                  />
                  <p className="text-left">{item.prompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <>
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item.response }}
                      ></p>
                    </>
                  )}
                </div>

                {/* <div key={index}>
                <p>{item.prompt}</p>
                <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
              </div> */}
              </div>
            ))}
          </>
        )}

        <div className="w-100" ref={mainContainerRef}></div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="send_icon cursor-pointer" onClick={() => input.length < 1 ? null : onSent()}
            style={{cursor: 'pointer'}}
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

      {/* <button onClick={scrollToBottom} className="scroll-to-bottom btn">
        Scroll to Bottom
      </button> */}
    </div>
  );
};

export default ChatScreen;
