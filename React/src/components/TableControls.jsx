import { MdEdit, MdDelete } from "react-icons/md";

function TableControls({exercise, onDelete, onEdit}){

    return (
        <>
            <MdEdit onClick={() => onEdit(exercise)}/>
            <MdDelete onClick={() => onDelete(exercise._id)}/>
        </>
    );
}

export default TableControls;
