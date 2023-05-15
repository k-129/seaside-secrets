# Seaside Secrets

<br>



## Description

Search platform for beaches in Portugal and creating favorites and editing info about beaches for the users to use.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of beach, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add favorite beaches to my list and edit them.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorites and delete them.
- **edit beaches** - As a user I want to be able to edit beaches info.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of beaches filter by my preferences.
- **beaches listing** - As a user I want to see more details of the beaches, be able to know their accommodaties, know the weather and useful places around them.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `DELETE`   | `/private/favorites/:beachId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/beaches`                     | Renders `beaches-list` view.                              |                                                          |
| `GET`      | `/beaches/details/:id`         | Renders `beaches-details` view for the beaches. |                                                          |
| `POST`      | `/beaches/details/:id`         | Sends edit beaches info to the server and updates the beach in the DB. |                                                          |







## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```



Favorites model

```javascript
{
  placeId: String,
}

```
Beaches Model

```javascript
{
  name: String,
  location: String,
  description: String,
  tips: String,
  filters: String
}


<br>

## API's

We're going to use google maps API and a weather API

<br>


## Packages
-Node.js
-HBS
-Express.Js
-Mongoose
-Axios

<br>



## Backlog






<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Erik Knoef - [`<github-username>`](https://github.com/k-129) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/erikknoef129)

Christian Kith - [`<github-username>`](https://github.com/Cris-k1) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/cristian-kith-pollini-85a229176)