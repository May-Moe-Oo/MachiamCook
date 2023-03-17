# MachiamCook
Recipe sharing app!

App for foodies and cooking enthusiasts who love to discover and share new dishes.

Record of your famous family recipes online and share it with the world. 

Who knows, it might become Michelin Star Dish!?


<br>

## Deployment
Upload and share your famous recipes on MachiamCook. 

[Click to View](https://better-handkerchief-foal.cyclic.app/) 

Sample account:- 
- User ID: May
- Password: 123


<br>

## Timeframe
1 week
<br>


<br>

## Technologies and Tools Used
- HTML
- CSS
- ejs
- Nodejs
- Express
- Express-session
- Mongoose / MongoDB
- GitHub
- Cyclic
- Visual Studio


<br>

## NodeJS packages installed and used
```
npm i
npm upgrade --latest
npm install nodemon -D
npm install -g express-generator
npm install express-session
npm install mongoose
npm install dotenv --save
npm install method-override
npm install bcrypt
npm install cookie-parser
npm install connect-mongo

```


<br>

## User Story
| When user ...                | What happens...                                                               |
|------------------------------|-------------------------------------------------------------------------------|
|Click Log in  | User will be redirected to the login page.|
|Enter the correct userID and password| User will be redirected to the user's Home page.|
|Enter the wrong userID and/or password| User will be informed of the error and remained on the login page.|
|Click on YAY!| User will be redirected to recipes page where all submitted recipes are displayed|
|Click on view| User will be redirected to recipes' detail page where user can read up on how to make the dish.|
|Input their comment and press submit| Their comment will be posted below the recipes' information. |
|Click Submit Recipe | User will be redirected to /recipes/new page. Where the user can fill in and submit their own recipes|
|Click Submit Recipe button| User's new recipe will be posted to the "All Recipes" and "My Book" pages, which can be accessed under the nave bar.|
|Click My Book | User will be redirected to /users/book page. Where users can view all the recipes that they have submitted.|
|Click on view| User will be redirected to recipes' detail page where the user can update or delete their submitted recipes.|
|Click Log out| User will be logged out and logged out successful message will be shown. |


<br>

## Model and their relationships
MachiamCook use both one to many and one to one relationship                                 

|One to many:-                                    | One to one relationship:-                 |
|-------------------------------------------------|-------------------------------------------|
|1 User ID has many recipes submitted under them. | 1 Recipe only has 1 author (userName).    |
|1 Recipe have many reviews.                      | 1 Review can be made by 1 user (userName).|

![image](https://user-images.githubusercontent.com/122252464/225791171-7859e9b1-5fe2-42ec-988e-21b85f91cda3.png)


<br>

## CRUD RESTful Routes 
Recipes example:-

![image](https://user-images.githubusercontent.com/122252464/225654612-8120f8cb-01f8-4eb3-88a7-09275ef3b389.png)


<br>

## Wireframe and App Screenshots
1. Homepage

![image](https://user-images.githubusercontent.com/122252464/225636244-4cf88ed1-3e6e-4c36-8c1a-73c5bae2926b.png)
![image](https://user-images.githubusercontent.com/122252464/225636400-9ed0ac54-2162-4ca9-a87f-29965c74d3e8.png)

2. Login page

![image](https://user-images.githubusercontent.com/122252464/225638033-85a5967f-d908-4f33-bcc3-4a916fe5a87e.png)
![image](https://user-images.githubusercontent.com/122252464/225637079-1cbe8406-88df-4c40-a528-0f1ba10a5a2f.png)

3. If Login fails 
If log in was unsuccessful, user will remain on the same login page and show the Invalid login msg and ask user to try again.

![image](https://user-images.githubusercontent.com/122252464/225639208-e0e5254a-badb-4dd4-bd98-00c65793ae69.png)

- If the password is wrong, 

![image](https://user-images.githubusercontent.com/122252464/225638632-477c2a05-d3c4-473d-8bcd-1114a05151f0.png)

- If the user ID is wrong,

![image](https://user-images.githubusercontent.com/122252464/225638945-bed9661a-8a50-4739-9a2f-b56d6f094e5a.png)

4. If Login successful, welcome user's home page

![image](https://user-images.githubusercontent.com/122252464/225640135-916088de-8fd9-453a-9ac9-387645559aa5.png)
![image](https://user-images.githubusercontent.com/122252464/225639453-82656d8a-1b7a-4ed7-9085-efd2d242d352.png)

5. Submit New recipes page

![image](https://user-images.githubusercontent.com/122252464/225641837-8586a3bc-cdb3-405d-a8b9-2079964b1a9a.png)
![image](https://user-images.githubusercontent.com/122252464/225641381-19bdc62d-52cf-4528-b055-5fed891c9e96.png)

6. All Recipes page

![image](https://user-images.githubusercontent.com/122252464/225643223-db9ea21b-2ec9-4448-b02e-4ad78122218e.png)
![image](https://user-images.githubusercontent.com/122252464/225643463-bb6d6303-dddd-4ffb-91cf-e91d75470d4d.png)

7. Each Recipe's Detail page

![image](https://user-images.githubusercontent.com/122252464/225645499-149e6d09-2a38-4bc7-9e87-73adebdbd87b.png)
![image](https://user-images.githubusercontent.com/122252464/225643775-9889db3a-b119-49b5-a56c-0b1b88f6ce71.png)

8. Recipe's review 
- if there are no reviews 

![image](https://user-images.githubusercontent.com/122252464/225645988-4ab0a99f-3ca7-466a-9a60-6e04ad543891.png)

- if there are reviews 

![image](https://user-images.githubusercontent.com/122252464/225646396-6d64a972-4723-4807-900a-1cf841d3c479.png)

9. User's My Book page

![image](https://user-images.githubusercontent.com/122252464/225647777-2f2a7055-f4e0-42c9-8a2c-94ea0731e517.png)
![image](https://user-images.githubusercontent.com/122252464/225648138-b84bdcf7-4b38-4d6c-94a1-c2bee18c5607.png)

Only user have access to their own submitted recipes in My Book page.
The author name refer to the userName. 
```
const book = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      author: req.session.user.userName,
    }).exec();
    if (recipes) {
      const context = { recipes };
      // res.send("my book page");
      res.render("users/book", context);
    } else {
      // res.send("Show book, need to log in");
      res.redirect("/login");
    }
  } catch (error) {
    res.send(error);
  }
};
```


10. User's Submitted Recipe's Detail page

![image](https://user-images.githubusercontent.com/122252464/225650101-811380cb-0e48-4af9-a09e-2dddc7ba4d13.png)
![image](https://user-images.githubusercontent.com/122252464/225648387-1207c70d-4f50-4d09-9e88-b2c44c5a175a.png)


11. Update Recipe

![image](https://user-images.githubusercontent.com/122252464/225652689-b7e4cbfb-8a09-4d69-a005-bb7b1ab4b606.png)
![image](https://user-images.githubusercontent.com/122252464/225650545-0b7a06fa-218e-4b6e-b2a7-e60b8312e297.png)


12. Log out

![image](https://user-images.githubusercontent.com/122252464/225654284-b00a0561-b470-47d8-8c42-3f15c76a32fa.png)
![image](https://user-images.githubusercontent.com/122252464/225653069-227ff06f-0129-4d9e-bb63-a5f787f61353.png)


<br>

## User Login Authorization

isAuth is added to routes to check if the user has login or not. 

If the user has not login, they will be directed to user/login page, asking them to log in. 

If the user is login, proceed wiht the next action next();. 

```
const isAuth = async (req, res, next) => {
  try {
    if (req.session.user.user_id) {
      const user = await User.findById(req.session.user.user_id).exec();
      res.locals.user = user;
      next();
    } else {
      const context = { msg: "Unauthorized, Access denied. Please login." };
      res.render("users/login", context);
    }
  } catch (error) {
    const context = { msg: "Unauthorized, Access denied. Please login." };
    res.render("users/login", context);
  }
};
```


<br>

## Learning Points
- ejs <%%> make it harder to read the codes compared to HTML.
- Set small goals and do one step at a time. 
- If unsure, write console.log to find out if the code is correct.
- Use res.send("insert msg"); to check for error and is the route is set up correctly.   
- Try and catch error is useful.
- Learn to accept and understand errors in the terminal. 


<br>

## Future Impovements
- user registration 
- category selection
- search bar
- like and bookmark recipes 


<br>

## References
Recipes used in MachiamCook are not owned by me. All rights belong to [allrecipes](https://www.allrecipes.com/).
