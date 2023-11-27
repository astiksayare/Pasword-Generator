
import { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGenerator = () => {

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(6);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);

    //useRef hook
    const passwordRef = useRef(null)


    const PasswordMaker = () => {
        let passValue = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (characterAllowed) str += "!@#$%^&*(){}[]?/<>`";

        for(let i = 0; i < length; i++){
            let random = Math.floor(Math.random() * str.length + 1);
            passValue += str.charAt(random);
        }

        setPassword(passValue);
    }

    // useEffect Hook
    useEffect(() => {
        PasswordMaker();
    }, [length, numberAllowed, characterAllowed, setPassword]);

    // useCallback Hook
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 999);
        window.navigator.clipboard.writeText(password);
        alert("Password has been copied!");
      }, [password])



    return (
        <>
        {/* Main Body of the WebPage */}
        <div className="h-screen w-full bg-indigo-400 flex flex-col justify-center items-center text-orange-400">

            <h1 className="text-2xl md:text-4xl font-serif font-semibold text-white mb-4">Password Generator</h1>

            {/* Outter div box */}
            <div className="lg:w-[50%] md:w-[80%] w-[90vw] h-[40%] bg-black rounded-2xl">
                
                {/* Input and the copy button */}
                <div className="w-full h-[30%] mt-6 mb-3 flex gap-2 items-center">
                    <input 
                    type="text" 
                    placeholder="Password Generator"
                    className="p-2 w-[80%] ml-4 rounded-xl outline-none font-semibold"
                    value={password}
                    ref={passwordRef}
                    />
                    <button 
                    className="bg-blue-600 p-2 mr-2 rounded-xl text-white md:px-4 md:w-[20%] md:mr-2 font-semibold hover:bg-blue-500 active:bg-green-300"
                    onClick={copyPasswordToClipboard}
                    >COPY</button>
                </div>

                {/* Range and length  */}
                <div className="w-full flex gap-2 justify-evenly ">
                    <div className="flex gap-2">
                    <input 
                    type="range"
                    min={6}
                    max={50}
                    value={length}
                    onChange={(event) => {setLength(event.target.value)}}
                    />

                    <label 
                    htmlFor="length"
                    >Length({length})</label>
                    </div>

                    {/* Number checkbox */}
                    <div className="flex gap-1">
                        <input 
                        type="checkbox" 
                        id="number"
                        className="cursor-pointer"
                        defaultChecked = {numberAllowed}
                        onClick={() => {
                            setNumberAllowed((prev) => !prev)
                        }}                       
                        />

                        <label htmlFor="number" className="cursor-pointer">Number</label>
                    </div>

                    {/* Character checkbox */}
                    <div className="flex gap-1">
                        <input 
                        type="checkbox" 
                        id="character"
                        className="cursor-pointer"
                        defaultChecked = {characterAllowed}
                        onClick={() => {
                            setCharacterAllowed((prev) => !prev)
                        }} 
                        />

                        <label htmlFor="character" className="cursor-pointer">Special Character</label>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default PasswordGenerator;