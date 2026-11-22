# Semester Week 11 Progress Report

## Completed Work

- Set up the project on my computer using Node.js, Git, and VS Code.
- Connected StudyBuddy to the Gemini API using the Google GenAI library.
- Kept my API key in a local .env file so it is not uploaded to GitHub.
- Created the main StudyBuddy functions to check the user's input, prepare a prompt, request a study guide from Gemini, and check the response.
- Created a terminal app that accepts study material and displays a summary, at least three practice questions, and an answer key.
- Tried the app with photosynthesis notes and received a complete study guide.
- Used an AI coding assistant for guidance and code suggestions, then added and ran the code in my project.

## Important Commits

1d3a89b — Add StudyBuddy study guide generation

## Current Functionality

Users can paste study material into the terminal app and type END when they are finished. StudyBuddy sends the material to Gemini and displays a summary, practice questions, and answers. The app also checks for empty input and missing sections in the AI response, and displays an error message if something goes wrong.

## Problems Encountered

PowerShell blocked the regular npm command. The Gemini model also returned a temporary 503 error because it was experiencing high demand.

## Solutions

I used npm.cmd to install the Gemini library. When the first model returned a 503 error, I changed the model setting to gemini-3.5-flash-lite and successfully generated a study guide.

## What I Learned

I learned how to connect a Node.js app to an AI API, keep an API key out of GitHub, and check that an AI response contains the sections the app needs.

## Next Week

I will add at least five tests for the app, including checks for valid material, empty input, incomplete AI responses, and API errors. I will also improve the app based on what I learn from those tests.
