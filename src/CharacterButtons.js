// import dependencies
import React, { useEffect, useState } from 'react'
import shuffle from './shuffle'

const CharacterButtons = props => {
    // destructure props
    const {
        characters,
        name,
        liftState
    } = props

    // state hook variables
    const [selectedCharacterObjects, setSelectedCharacterObjects] = useState(characters)

    const handleCharacterClick = (selectedCharacterObject) => {
        // find index position of selected character
        const index = selectedCharacterObjects.findIndex(charObj => charObj.character === selectedCharacterObject.character)

        // flip selected value 
        const updatedSelectedCharacterObject = {
            character: selectedCharacterObject.character,
            selected: !selectedCharacterObject.selected
        }

        // find and replace selected character
        selectedCharacterObjects.splice(index, 1, updatedSelectedCharacterObject)

        // filter character objects
        const filteredCharacterObjects = selectedCharacterObjects.filter(charObj => charObj.selected === true)

        // extract character property from filtered character objects
        const selectedCharacters = filteredCharacterObjects.map(charObj => charObj.character)
        // shuffle selected characters
        const shuffledCharacters = shuffle(selectedCharacters)
        // lift state
        liftState(shuffledCharacters)

        // create copy of selected characters to force rerender
        const selectedCharacterObjectsCopy = selectedCharacterObjects.map(charObj => charObj)
        // update state
        setSelectedCharacterObjects(selectedCharacterObjectsCopy)
    }

    const handleSelectClick = bool => {
        // apply changes to all characters
        const selectAllCharacters = selectedCharacterObjects.map(charObj => ({
            ...charObj,
            selected: bool
        }))

        // update state
        setSelectedCharacterObjects(selectAllCharacters)

        // filter character objects
        const filteredCharacterObjects = selectAllCharacters.filter(charObj => charObj.selected === true)

        // extract character property from filtered character objects
        const selectedCharacters = filteredCharacterObjects.map(charObj => charObj.character)

        // shuffle selected characters
        const shuffledCharacters = shuffle(selectedCharacters)

        // lift state
        liftState(shuffledCharacters)
    }

    // invoke click handler after component mounts
    useEffect(() => {
        handleSelectClick(true)
    }, [])

    return (
        <div className="row character-buttons">
            <div className="col-12">
                <div className="row my-3">
                    <div className="col-xs-12 col-sm-6 text-xs-center text-sm-left">
                        <h5 className="card-title">{name} Characters</h5>
                    </div>
                    <div className="col-xs-12 col-sm-6 text-xs-center text-sm-right">
                        <button className="btn btn-secondary mr-2" onClick={() => handleSelectClick(true)}>
                            Select All
                        </button>
                        <button className="btn btn-outline-secondary ml-2" onClick={() => handleSelectClick(false)}>
                            Deselect All
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 text-center">
                <div className="form-group">
                    {selectedCharacterObjects && selectedCharacterObjects.map(charObj => (
                        <button className={`btn character ${charObj.selected ? 'btn-secondary' : 'btn-outline-secondary'}`} key={charObj.character} onClick={() => handleCharacterClick(charObj)}>
                            {charObj.character}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CharacterButtons
