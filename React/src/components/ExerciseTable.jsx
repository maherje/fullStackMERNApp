import ExerciseRow from "./ExerciseRow";

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>REPS</th>
                    <th>WEIGHT</th>
                    <th>UNITS</th>
                    <th>DATE</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, ind) => <ExerciseRow exercise={exercise} 
                        onDelete={onDelete} onEdit={onEdit} key={ind} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;