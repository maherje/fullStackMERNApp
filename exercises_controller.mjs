import 'dotenv/config';
import * as exercisesModel from './exercises_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, matchedData, validationResult } from 'express-validator';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: "Not found"}
const ERROR_INVALID_REQUEST = {Error: "Invalid request"}

const app = express();
app.use(express.json());

app.listen(PORT, async ()=>{
    await exercisesModel.connect(true);
    console.log(`Server listening on port: ${PORT}`);
})

/**
 * Create a new exercise
 */
app.post('/exercises', 
    [
        body('name')
            .isLength({min: 1})
            .withMessage("Name must be at least 1 character."),
        body('reps')
        .isInt({min:1})
        .withMessage("Reps must be greater than 0"),
        body('weight')
        .isInt({min: 1})
        .withMessage("Weight must be greater than 0"),
        body('unit')
        .isIn(["kgs", "lbs"])
        .withMessage('Units must be kg or lbs'),
        body('date')
        .matches(/^\d\d-\d\d-\d\d$/)
        .withMessage('Must be in XX-XX-XXXX date format')
    ],
    asyncHandler(async (req, res) => {
        const result = validationResult(req);
        if(!result.isEmpty()) {
            return res.status(400).send(ERROR_INVALID_REQUEST);
        }

        const data = matchedData(req);
        const exercise = await exercisesModel.createExercise(
            data.name, 
            data.reps,
            data.weight,
            data.unit,
            data.date);
        res.status(201).json({
            "_id": exercise._id,
            "name": exercise.name,
            "reps": exercise.reps,
            "weight": exercise.weight,
            "unit": exercise.unit,
            "date": exercise.date,
            "__v": exercise.__v
        })
    })
)

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const exercises = await exercisesModel.findExercises();
    res.status(200).json(exercises);
    }));


/**
 * Retrieve the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercisesModel.findExerciseById(req.params._id);
    // Return 404 Error if user is not found.
    if(exercise == null){
        res.status(404).json(ERROR_NOT_FOUND);
    }else{
        res.status(200).json(exercise);
    }
}));

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/exercises/:_id',
    [
        body('name')
            .isLength({min: 1})
            .withMessage("Name must be at least 1 character."),
        body('reps')
        .isInt({min:1})
        .withMessage("Reps must be greater than 0"),
        body('weight')
        .isInt({min: 1})
        .withMessage("Weight must be greater than 0"),
        body('unit')
        .isIn(["kgs", "lbs"])
        .withMessage('Units must be kg or lbs'),
        body('date')
        .matches(/^\d\d-\d\d-\d\d$/)
        .withMessage('Must be in XX-XX-XXXX date format')
    ],
    asyncHandler(async (req, res) => {
        // Validate the request body
        const result = validationResult(req);
        // Request body is invalid
        if(!result.isEmpty()) {
            return res.status(400).json(ERROR_INVALID_REQUEST);
        }

        //Grab the valid data in the request body
        const data = matchedData(req);

        // Try to find the exercise by the id
        const exercise = await exercisesModel.findExerciseById(req.params._id);
        // Return 404 Error if exercise is not found.
        if(exercise == null){
            return res.status(404).json({Error: "Not found"});
        }else{
            const updatedExercise = await exercisesModel.updateExerciseById(req.params._id, data);
            return res.status(200).json(updatedExercise);
        }
}));

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const id = req.params._id;
    const numDeleted = await exercisesModel.deleteById(id);
    if(numDeleted == 0){
        return res.status(404).json(ERROR_NOT_FOUND);
    }else{
        return res.status(204).json();
    }
}));