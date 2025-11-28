import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

/**
 * Connects to a MongoDB database while optionally dropping a collection.
 * @param {Boolean} dropCollection 
 */
async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }
        Exercise = createModel();

    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Creates a connection to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
    return mongoose.connection;
}

/**
 * Creates a Mongoose schema for a MongoDB database
 * @returns A Mongoose model class for Exercise
 */
function createModel(){
    // Define the Schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

/**
 * Takes a name, reps, weight, unit and data input and returns
 * a new Exercise database entry.
 * @param {String} name - Name of the exercise 
 * @param {Number} reps - Number of reps
 * @param {Number} weight - Weight at which the exercise reps were performed 
 * @param {String} unit - Units of the weight. Must be "kgs" or "lbs"
 * @param {String} date - Date of the exercise in XX-XX-XXXX
 * @returns A MongoDB database entry for a new user.
 */
async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

/**
 * Retrieve all exercises in the database
 * @returns A query object for all the exercises in the database.
 */
async function findExercises(){
    const query = Exercise.find();
    return query.exec();
}

/**
 * Takes a database entry id and returns a query object for the matching entity.
 * @param {ObjectId} id 
 * @returns A query object.
 */
async function findExerciseById(id){
    const query = Exercise.findById(id);
    // findById returns null if it cannot locate the id
    if(query == null){
        return null;
    } else {
        return query.exec();
    }
}

/**
 * Takes a database entry id and an object with changes to make.
 * Makes the requested changes to the database and returns the updated exercise entry.
 * @param {ObjectId} id 
 * @param {Object} data 
 * @returns The updated exercise entry object.
 */
async function updateExerciseById(id, data){
    await Exercise.updateOne({_id: id}, data).exec();
    const updatedExercise = findExerciseById(id);
    return updatedExercise;
}

/**
 * Takes a database entry id and deletes the matching item from the database
 * if it exists.
 * @param {ObjectId} id 
 * @returns The count of items that were deleted from the database (0 or 1)
 */
async function deleteById(id){
    const deleteObject = await Exercise.deleteOne({_id: id});
    return deleteObject.deletedCount;
}


export { connect, createExercise, findExercises, findExerciseById, updateExerciseById, deleteById };
