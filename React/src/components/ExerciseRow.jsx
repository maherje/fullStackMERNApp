import '../App.css';
import TableControls from './TableControls';

function ExerciseRow({ exercise, onDelete, onEdit }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><TableControls exercise={exercise} onDelete={onDelete} onEdit={onEdit}/></td>
        </tr>
    );
}

export default ExerciseRow;