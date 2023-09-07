# SP DVD 
A DVD store that shows users what dvd they can rent, the website shows the rating, cost, Age Rating, description and etc.

Instructions:
1. Import Database Data from the "sql" folder under the folder Server/sql/BED_CA2_Database. 
   - Added a "role" column in Staff table to differentiate between admin and staff, with extra values in the table
   - Added a "image" column in Film table to store the image name when adding new film

2. Make sure that your db.config file under the "config" folder is able to connect to the database with the right username and password.
   Username: bed_dvd_root
   Password: pa$$woRD123
   Note: Make sure that the user is given admin privileges in the database.

3. Make sure that you have the following libraries installed in the respective folders.
   a. Server -> "npm install express mysql body-parser cors jsonwebtoken multer path"
   b. Client -> "npm install express local-storage path"

4. Open 2 terminal tabs, CD into the respective folders and run using nodemon.
   a. Server -> "nodemon server.js"
   b. Client -> "nodemon index.js"

5. Your Client Side should be running now where the Host Link is "http://localhost:3001".

## Snippets of how the website looks like:
### Homepage
![Screenshot 2023-09-07 104309](https://github.com/EdenTan2003/BED_CA/assets/61679569/13bd16ca-3a6e-480b-b521-a7e5010c245a)

### Search Results 
![Screenshot 2023-09-07 104343](https://github.com/EdenTan2003/BED_CA/assets/61679569/f7c9c593-b968-4438-b36d-309798a0e0c7)

### DVD Info Page
![Screenshot 2023-09-07 104430](https://github.com/EdenTan2003/BED_CA/assets/61679569/0f8998ad-7345-4be5-8b0d-3634adb748a9)

### Admin Page
![Screenshot 2023-09-07 104526](https://github.com/EdenTan2003/BED_CA/assets/61679569/f40c6abb-99a9-4f01-a82d-c62da612ad24)
