# Spotify Wallpaper
## What is it?
A lively wallpaper simulation built using JavaScript that displays the current song playing on your Spotify account, the songs details with cool graphics.

## Stats

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/Status-Completed-green.svg)

## File Structure
```bash
📂Spotify Wallpaper
 ┣ 📂 Misc                     # Required styling data
 ┃  ┗ 📄 no_song.png           # Song cover when no song is playing
 ┣ 📂 Public
 ┃  ┣ 📄 index.html            # The HTML file that runs on the browser
 ┃  ┣ 📄 style.css             # CSS syntax that defines cool graphics/styles
 ┃  ┗ 📄 script.js             # Makes the HTML page responsive and dynamic
 ┣ 📄 CHANGELOG.md             # Version history
 ┣ 📄 package.json             
 ┣ 📄 package_lock.json        
 ┣ 📄 .gitignore               # Commands for all files to be exculed while git committing
 ┗ 📄 README.md                # You’re looking at it 😎 (Current version details)
```

## How to Run
- First of all, ensure that the latest version of Node.js (LTS) has been installed.
- Make sure to activate live server first. That can be done by running the HTML from the editor.
- To start the application, run the following command on your command prompt/terminal from the project repo.
```bash
node server.js
```
- Click on the link provided on the output (You may close the terminal after this).
- Make sure Spotify is running on your desktop.
- **Note:** Token expires after an hour after running the command. To refresh it, re-run the node command and click on the link.

## Roadmap
- [x] Connecting to server
- [x] Displaying details
- [x] Song card
- [x] Adaptive colours

## Contribution
Feel free to make an edit or change to this project to improve its stability. You may do so by first pulling a request or an issue to talk about it. All are welcome!
