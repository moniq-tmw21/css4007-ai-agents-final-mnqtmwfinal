# Semester Week 13 Progress Report

## Completed Work

- Tested StudyBuddy with notes about the water cycle.
- Found and fixed a problem where pasting several lines only sent some of them to the AI.
- Updated the app to read all pasted lines until the user types END.
- Improved the AI instructions so the summary keeps the important facts and process stages from the notes.
- Added a check that compares the number of summary bullets with the number of note lines.
- Tried the app again and received a summary with five bullet points and four practice questions.

## Important Commits

- Improve StudyBuddy input and summary quality
- Send StudyBuddy rules as system instructions

## Current Functionality

Users can paste multi-line study material into the terminal and type END when they are finished. StudyBuddy sends the material to Gemini and displays a summary, practice questions, and an answer key. The app checks that the response has the required sections and enough summary bullets and questions.

## Problems Encountered

When I first tested several lines of notes, the app only sent some of them to Gemini. The summary left out important stages of the water cycle.

## Solutions

I changed how the app reads pasted text so it collects each line before sending the material. I also improved the AI instructions and added a check for missing summary bullets.

## What I Learned

I learned that an AI response can have the right format but still leave out important information. I also learned to test the app with real examples and check the content, not just whether the API responds.

## Next Week

I will improve the app's error handling and make it clearer for users when their input is empty or the AI service is unavailable.
