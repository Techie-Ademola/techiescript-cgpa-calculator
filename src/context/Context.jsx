import { createContext, useState, useEffect } from "react";
import run from "../config/aiChat";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); // save input data
    const [recentPrompt, setRecentPrompt] = useState("");   // display in the recent prompt 
    const [prevPrompts, setPrevPrompts] = useState([]); // store in input history
    const [showResult, setShowResult] = useState(false);    // if its true then it will hide the (default like Hello, How)  
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [responses, setResponses] = useState(() => {
        // Load responses from localStorage if available
        const savedResponses = localStorage.getItem("responses");
        return savedResponses ? JSON.parse(savedResponses) : [];
    });

    // useEffect(() => {
    //     // Save responses to localStorage whenever they change
    //     localStorage.setItem("responses", JSON.stringify(responses));
    // }, [responses]);

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 10*index)
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData(""); // Reset result data state
        setLoading(true);
        setShowResult(true);

        let response;
        // Set the recent prompt before making the API call
        if (prompt !== undefined) {
            setRecentPrompt(prompt); // Set recentPrompt here
            response = await run(prompt);
        } else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input); // Set recentPrompt here
            response = await run(input);
        }

        try {
            // Process the response
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length; i++)
            {
                const nextWord = newResponseArray[i];
                delayPara(i,nextWord+" ");
            }

            // Append new response with its corresponding prompt
            setResponses(prevResponses => [
                ...prevResponses,
                { prompt: prompt !== undefined ? prompt : input, response: newResponse2 } // Use the correct prompt
            ]);
        } catch (error) {
            console.log("Error occurred:", error);
        } finally {
            setLoading(false);
            setInput(""); // Reset the input field for new input
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        showResult,
        recentPrompt,
        resultData,
        input,
        setInput,
        loading,
        newChat,
        responses, // Add responses to context value
        setResponses, // Optional: if you need to modify responses directly
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider