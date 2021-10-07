import React from 'react'

const ExerciseForm = () => {


    return (
        <div>
            <label htmlFor="muscle">Muscle part</label>
            <select name="muscle" id="muscle">
                <option value="legs">Legs</option>
                <option value="chest">Chest</option>
            </select>
        </div>
    )
}

export default ExerciseForm
