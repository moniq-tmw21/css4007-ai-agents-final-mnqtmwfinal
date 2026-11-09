# Project Proposal — Semester Week 10

## Project Title

StudyBuddy — Your AI Study Partner

## Problem Description

Students often have a lot of notes to study before a quiz or exam. Sometimes it is hard to figure out which parts are important or to make practice questions. StudyBuddy will help by turning notes that students provide into a short summary, practice questions, and answers.

## Target Users

School students, university students, and independent learners who want help studying from their own notes or learning materials. StudyBuddy can be used by students at different school levels, from elementary to university.

## Selected Difficulty

D — Foundation

## Expected Functionality

- Users can paste their notes or study material into the app.
- The app checks that the user has entered some study material before sending it to the AI.
- AI creates a summary, practice questions, and answers based on the material.
- The app checks that the AI response includes all the required parts.
- The results are shown in a clear and readable format.
- The app shows a helpful message if the input is invalid or the AI service has a problem.

## Proposed Functions

validateInput(text) :
- Purpose: Check that the user entered enough study material.
- Input: Text entered by the user.
- Output: A result saying whether the text can be used, or an error message.
- Dependencies: JavaScript.

buildStudyPrompt(text) :
- Purpose: Prepare the instructions sent to the AI.
- Input: Study material entered by the user.
- Output: A prompt asking the AI to make a summary, questions, and answers using the material.
- Dependencies: JavaScript.

generateStudyGuide(text) :
- Purpose: Send the material to the AI and prepare the study guide.
- Input: Study material that has passed the input check.
- Output: A summary, practice questions, and answers.
- Dependencies: The prompt function, the AI client, and output validation.

validateStudyGuide(result) :
- Purpose: Check that the AI response has a summary, at least three questions, and answers for those questions.
- Input: The response from the AI.
- Output: A complete study guide, or an error message if something is missing.
- Dependencies: JavaScript.

## Proposed Agent Tools

Not applicable — This is a Level D project. The AI will respond to the user's study material directly and will not use additional tools.

## Model Selection

I plan to use an AI model through an API. I will choose the provider and model during development based on availability and cost. The API key will be kept private and will not be uploaded to GitHub.

## Architecture

The user enters study material → the app checks that text was provided → the app sends it to the AI → the app checks the AI's response → the app displays the summary, practice questions, and answers.

## Example Requests

- “Make a short summary and five practice questions from these biology notes.”
- “Explain the main points in these history notes and make three questions with answers.”
- “Create a study guide from these programming notes, including the key ideas and practice questions.”

## Evaluation Plan

- I will test the app with valid study material and check that it produces a summary, practice questions, and answers.
- I will check how the app handles empty input and responses that are missing required parts.
- I will test what happens if the AI service has an error.
- I will write at least five tests and review the results to see if they are clear and useful for studying.

## Weekly Milestones

- Week 10 (Nov 2–8): Choose the project idea and complete the proposal.
- Week 11 (Nov 9–15): Set up the app and connect it to an AI model.
- Week 12 (Nov 16–22): Add the feature that creates summaries, questions, and answers.
- Week 13 (Nov 23–29): Check the AI's response and improve the instructions sent to it.
- Week 14 (Nov 30–Dec 6): Handle missing input and problems with the AI service.
- Week 15 (Dec 7–13): Write and improve at least five tests.
- Week 16 (Dec 14–20): Try the app with different learning materials and fix any problems.
- Week 17 (Dec 21–22): Finish the final report and prepare to demonstrate the app.


