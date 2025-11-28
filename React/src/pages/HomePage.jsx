import ExerciseTable from '../components/ExerciseTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {loadExercises();}, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204){
            setExercises(exercises.filter(e => e._id !== _id))
        }else{
            alert(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`);
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }

    return (
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
            <footer>&copy; 2025 Jeffrey Maher</footer>
        </>
    )
}

export default HomePage;