import { useState, useRef } from 'react'
import './App.css'

function App() {

    const [isCopied, setIsCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false)
    const [pwdLength, setPwdLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(false)
    const rangeInputRef = useRef(null)
    const IncUppInput = useRef(null)
    const IncLowInput = useRef(null)
    const IncNumInput = useRef(null)
    const IncSymInput = useRef(null)
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = lowercaseChars.toUpperCase()
    const numberChars = "0123456789"
    const symbolChars = "!@#$%&()_-"
    let pwdSettingsChbxs = []
    const [generatedPwd, setGeneratePwd] = useState('CLICK GENERATE!')

    setTimeout(() => {
      pwdSettingsChbxs = [IncUppInput.current, IncLowInput.current, IncNumInput.current, IncSymInput.current]
      const checkedSettings = pwdSettingsChbxs.filter(setting => setting.checked)
      if (checkedSettings.length == 1) {
        checkedSettings[0].disabled = true
      }else{
        checkedSettings.map(setting => setting.disabled = false)
      }
    }, 250);

    const generatePwd = (length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {
    
      let allowedChars = ''
      let password = ''
  
      allowedChars += includeLowercase ? lowercaseChars : '';
      allowedChars += includeUppercase ? uppercaseChars : '';
      allowedChars += includeNumbers ? numberChars : '';
      allowedChars += includeSymbols ? symbolChars : '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length) 
        password += allowedChars[randomIndex]       
      }

  
      setGeneratePwd(password)
  }
    
    const handleIconClick = () => {
      navigator.clipboard.writeText(generatedPwd);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000); // Reset animation after 1 second
    };

    const handleSaveClick = () => {
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 1000); // Reset animation after 1 second
    }

    const handlePwdLength = (e) =>{
      setPwdLength(e.target.value)
    }

    const handleGeneratePwd = () => {
      console.log(generatePwd(pwdLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols))
    }

  return (
    <>
      <div className="app">
        <h1>Password Generator</h1>
        <div className="pwd-output">
        <div className="input-container">
        <input ref={rangeInputRef} type="text" disabled className={isCopied ? 'icon-clicked': null} value={generatedPwd}/>
        <svg className={`icon ${isCopied ? "copied" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={handleIconClick} >
          <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
          <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
          <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
        </svg>
        {isCopied && <span className="copy-feedback">Copied!</span>}
      </div>
        </div>
        <div className="pwd-length">
          <p className='pwd-length-display'>Length:<span className='bold'>{pwdLength}</span></p>
          <div className="range-input">
            <p>4</p>
            <input type="range" name="pwd-length" id="pwd-length" min={4} max={32} step={1} value={pwdLength} onChange={handlePwdLength}/>
            <p>32</p>
          </div>
        </div>
        <div className="pwd-settings">
          <div className="inc-uc">
            <p>Include Uppercase</p>
            <label className="switch">
              <input ref={IncUppInput} type="checkbox" defaultChecked={includeUppercase} onChange={(e) => setIncludeUppercase(u => u = e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="inc-lc">
            <p>Include LowerCase</p>
            <label className="switch">
              <input ref={IncLowInput} type="checkbox" defaultChecked={includeLowercase} onChange={(e) => setIncludeLowercase(l => l = e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="inc-num">
            <p>Include Numbers</p>
            <label className="switch">
              <input ref={IncNumInput} type="checkbox" defaultChecked={includeNumbers} onChange={(e) => setIncludeNumbers(n => n = e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="inc-smb">
            <p>Include Symbols</p>
            <label className="switch">
              <input ref={IncSymInput} type="checkbox" defaultChecked={includeSymbols} onChange={(e) => setIncludeSymbols(s => s = e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <button className="generate-pwd-btn" onClick={handleGeneratePwd}>
          Generate Password
        </button>
        <button className={`generate-pwd-btn ${isSaved ? 'saved': ''}`} onClick={handleSaveClick}>
          Save Password
        </button>
        {isSaved && <span className="copy-feedback">Saved!</span>}
      </div>
    </>
  )
}

export default App
