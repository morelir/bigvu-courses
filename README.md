<h1 align="center" style="border-bottom: none">BIGVU - Courses</h1>

## Home Task
### Motivation
As part of BIGVU apps, we provide video courses, to make sure our users can learn how to use
BIGVU’s main features like a pro.
Your take home task is to create a simplified version of the courses feature.
Create a web project that fetch BIGVU’s Courses and shows them in a list.
### Design
https://www.figma.com/file/5qzynxJzovuMkjx9fmRpJp/iOS-courses-task?node-id=0-1
### API Documentation
Use Basic authentication to perform the API calls with:    
-username: bigvu  
-password: interview<br/><br/>
Endpoints:
* Course list: https://interviews.bigvu.tv/course/list
* Course:  https://interviews.bigvu.tv/course/{{id}} (id is the course id)
### Definitions
- Finishing watching a chapter - watching at least 10 seconds from it
- Video playing position - the position a user stops to watch the video. should be between:
0 &lt;= x &lt; video duration. In case that the user watched the entire video, it should be 0.
- Storing locally - the data will be saved on the users computer
### Functionality
- Fetch the course list and present it in a list (see design and API docs above).
- Clicking on an item in the courses list will move to specific course screen.
- Fetch specific course by id, show the course chapters in a list
- The video playing position of a chapter should be stored locally, so when the user returns
to the course screen, the player will auto play the chapter from the last playing position.
- The video player should auto play a video (first in chapter list or the last playing chapter)
immediately when the screen appears (no user click required)
- When a user finished watching a chapter, the chapter will be marked as finished and
appropriate icon will appear in the chapters list.
- When a user finished watching all the chapters, the course will be marked as finished and
appropriate icon will appear on the course list screen.
- User can navigate between chapters by clicking on them.
- When a chapter ends the next chapter should start to play automatically until the user
reach the last chapter.
- The browser back button will take back to the course list  

## Screenshots

</br>
<h3 align="center" style="border-bottom: none">DESKTOP</h1>

![courses](https://user-images.githubusercontent.com/58606266/230789391-df82c90a-37d8-4b2d-abc2-8afeda6d3dc3.PNG)
![course](https://user-images.githubusercontent.com/58606266/230788094-42c40edf-e79f-45fc-adc9-e907b1802fec.PNG)
![course2](https://user-images.githubusercontent.com/58606266/230789314-7f8f55a2-09f6-490e-a3af-d2c5861e5c41.PNG)
![course-list-finished](https://user-images.githubusercontent.com/58606266/230789491-a9d9a430-ca79-4621-8db1-eaa6e44f221f.PNG)
![courses](https://user-images.githubusercontent.com/58606266/230789103-0a5bfb4a-6f65-47bb-8e47-0817610069cb.PNG)

<h3 align="center" style="border-bottom: none">MOBILE</h1>
<div align="center">
  <img src="https://user-images.githubusercontent.com/58606266/230788124-9ee93ae6-db9e-4583-a89f-091af3160974.PNG" width="250">
  <img src="https://user-images.githubusercontent.com/58606266/230788125-cea3651c-3e5e-4e79-ad3b-d6975f5377e6.PNG" width="250">
</div>



<br/>

### How to run this project locally :
- Install Node.js and NPM (Node Package Manager) on your machine. You can download and install them from the official Node.js website: https://nodejs.org/en/.
-  After downloading the source code from git repository, Open a terminal(Windows Command Prompt or PowerShell).
-  Navigate to source code folder and run the following commands:

    - `npm install` (Install the project dependencies)
    - `npm start`   (Start the development server)


<br/>

### Created with:
* React

