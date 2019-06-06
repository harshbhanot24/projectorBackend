#Projector App
This is a application indended to make the process of coding challenges easy for the audience. This app will try to bridge the gap between the people who are ready to help others to learn and those who are in need to learn.
Anybody can easily signup using a email and password and can post any type of question after completion of his profile which can be viewed by the general audience as well as any find of attachments can be easily downloaded.
>Every question has a rating envolved, user can rate it on the basis of quality of question as well as support by the Admin of that problem.

Now the end user can also signup and can submit his solution simply by providing the github link and will be evaluated by the admin.

>the problem admin can see list of all question as well as views and submissions on each of them

### Features

- Build on MEAN stack, this express application provides RestEnd points to the Angular Application;
- Full-featured:HTML5 based text editor, secured authentication and authorization
- Support for variety of data uploads and powered by the Mongo Cloud server
- Compatible with all modern browser supporting JS as well as mobile friendly too;
- Error handling with proper errors messages to end user

# Projector App


###Design Pattern

The design is based on modern MVC architecture basically MEAN stack.
The application is hosted on Heroku cloud and for the database part it is on MongoCloud. The frontend is communicating via Rest APIs.
Various middlewares are present to filter user requests and redirect them accordingly.
> "Application URL", [Link](http://fast-waters-72330.herokuapp.com)。

###**Major functionalities**
                    
-Live data feed containing latest problems posted by the users.
-Fully functional login signup functionality with full profile edits.
-Freedom to use WYSIYYG editor as well as all kind of uploads to the server.
-Session management via JWT web tokens.
-Filters based on dates, tags and authors available.
-User posting can see total views, submission and ratings on each post.
-End user can do multiple submissions and keep a track on the notifications.




##How to Run the Application
You can fork the backend and frontend of the application and use it.
Please set the CORS settings as well as the MongoCloud setting for your personal use.(use can also use local mongo database)
>At last just do npm install and then if you are starting frontend and backend seperately just start both the servers.
Otherwise just build the angular project and place it in your express application, provide the neccessary starting point for the express app and
you are good to go.....
