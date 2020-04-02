// import dependencies
import React, {
	useEffect,
	useRef,
	useState
} from 'react'
import {
	lowerCaseCharacters,
	numericCharacters,
	specialCharacters,
	upperCaseCharacters,
} from './characters'
import shuffle from './shuffle'

// import components
import CharacterButtons from './CharacterButtons'
import PasswordLength from './PasswordLength'

// import images
import logo from './logo.svg'

// import styles
import './styles.css'

const App = () => {
	// state hook variables
	const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard')
	const [password, setPassword] = useState('')
	const [passwordLength, setPasswordLength] = useState(16)
	const [scrollHeight, setScrollHeight] = useState(0)
	const [selectedCharacters, setSelectedCharacters] = useState([])
	const [selectedLowerCaseCharacters, setSelectedLowerCaseCharacters] = useState([])
	const [selectedNumericCharacters, setSelectedNumericCharacters] = useState([])
	const [selectedSpecialCharacters, setSelectedSpecialCharacters] = useState([])
	const [selectedUpperCaseCharacters, setSelectedUpperCaseCharacters] = useState([])

	// ref hook varialbes
	const passwordRef = useRef(null)

	// utility variables
	const date = new Date()

	const handleCopyClick = e => {
		// select the contents of the password text area 
		passwordRef.current.select()

		// replace the clipboard's current content
		document.execCommand('copy')

		// maintain focus on button
		e.target.focus()

		// update state
		setCopyButtonText('Copied!')
		setTimeout(() => {
			setCopyButtonText('Copy to Clipboard')
		  }, 5000)
	}

	const handleGenerateClick = () => generatePassword()

	const generatePassword = () => {
		let password = []

		for (let i = 0; i < passwordLength; i++) {
			// generate a random number
			const randomIndex = Math.floor(Math.random() * selectedCharacters.length)

			// select element from selected characters
			const randomCharacter = selectedCharacters[randomIndex]

			// add selected character to password
			password.push(randomCharacter)
		}

		setPassword(password.join(''))
	}

	// update selected characters when user input changes
	useEffect(() => {
		// shuffle selected characters
		const shuffledSelectedCharacters = shuffle([
			...selectedLowerCaseCharacters,
			...selectedNumericCharacters,
			...selectedSpecialCharacters,
			...selectedUpperCaseCharacters
		])

		// update state
		setSelectedCharacters(shuffledSelectedCharacters)
	}, [selectedLowerCaseCharacters, selectedNumericCharacters, selectedSpecialCharacters, selectedUpperCaseCharacters])

	// update password when user input changes
	useEffect(() => {
		generatePassword()
		setCopyButtonText('Copy to Clipboard')
	}, [passwordLength, selectedCharacters])

	// reset scroll height when password changes
	useEffect(() => {
		setScrollHeight(0)
	}, [password])

	// calculate scroll height whenever its value changes
	useEffect(() => {
		setScrollHeight(passwordRef.current.scrollHeight)
	}, [scrollHeight])

	return (
		<div id="app">
			<div className="container my-3">
				<div className="row">
					<div className="col">
						<div className="card text-center">
							<div className="card-header">
								<img alt="logo" className="logo" src={logo} />
								<h5 className="card-title">Secure Password Generator</h5>
							</div>
							<div className="card-body">
								<div className="row generate-password">
									<div className="col">
										<h5 className="card-title">Your New Password:</h5>
										<textarea readOnly ref={passwordRef} value={password} style={{ height: scrollHeight }}></textarea>
										<button className="btn btn-primary mx-2 my-3" onClick={handleGenerateClick}>
											Generate Password
										</button>
										<button className="btn btn-outline-primary mx-2 my-3" onClick={handleCopyClick}>
											{copyButtonText}
										</button>
									</div>
								</div>
								<PasswordLength liftState={setPasswordLength} />
								<hr />
								<CharacterButtons
									characters={lowerCaseCharacters}
									name={"Lower Case"}
									liftState={setSelectedLowerCaseCharacters}
								/>
								<hr />
								<CharacterButtons
									characters={upperCaseCharacters}
									name={"Upper Case"}
									liftState={setSelectedUpperCaseCharacters}
								/>
								<hr />
								<CharacterButtons
									characters={numericCharacters}
									name={"Numeric"}
									liftState={setSelectedNumericCharacters}
								/>
								<hr />
								<CharacterButtons
									characters={specialCharacters}
									name={"Special"}
									liftState={setSelectedSpecialCharacters}
								/>
							</div>
							<div className="card-footer text-muted">
								© {date.getFullYear()} IC, LLC
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
