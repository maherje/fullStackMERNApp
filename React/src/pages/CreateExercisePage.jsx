import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(
                '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );
        if(response.status == 201){
            alert("Successfully added the exercise");
        } else{
            alert("Failed to add the exercise, status code = " + response.status)
        }
        navigate('/')
    };



    return (
        <div>
            <h2>Create a New Exercise</h2>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)}/>
            <input
                type="number"
                placeholder="Enter reps here"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)}/>
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)}/>
            <select name="unit" defaultValue="kgs" onChange={e => setUnit(e.target.value)}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)}/>
            <button onClick={createExercise}>Create Exercise</button>
            <footer>&copy; 2025 Jeffrey Maher</footer>
        </div>
    )
}

export default CreateExercisePage;
