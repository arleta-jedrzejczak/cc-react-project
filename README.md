# CC-node-react-project
## Team
### Mentor:
- Arleta Jędrzejczak
### Authors:
- Stanisław Gardzielewski 
- Mariusz Olszewski 
- Bartosz Ratajczyk
- Urszula Wilk
## Main technologies
- React    12.20.6
- React-router-dom     5.1.7
- Material-ui    4.11.3
- Axios    0.21.1
- Cors    2.8.5
- Firebase     8.3.1
- Formik     2.2.6
- Web-vitals    1.1.1
## Additional packages
- body-parser
- supertest
- prettier
- jsonwebtoken
- dotenv
- bcrypt

## Project description
This application allows registration of new users and login to the application for existing users. After creating an account and logging in, you are redirected to the main view, where you can view the posts, and after selecting one of them, you are redirected to the subpage with the entry details. Each post includes a title, photo, and tags. If the user wants to add an entry, he must register. Logged in users can create new posts, edit and delete their own posts and add other users' posts to favorites. Logged in users can comment on all posts. Users and posts are saved in a database created during the previous project.
Below is the link to the Beckend part:
https://github.com/arleta-jedrzejczak/CC-node-project 

## List of functionalities
1.  Possibility to create an account
2.  Logging into the application 
3.  Ability to add a new post with:
	- photo
	- title
	- tags
4.  The ability to read the post - any user
5.  Possibility to edit the post - only the post author
6.  Possibility to delete a post - only the author of the post
7.  The ability to add comments - only logged users 
8.  Ability to add a post to your favorites (future version)

## Examples of the implementation:

1.  Snackbar
<Snackbar
    open={passwordsMatchSnackbar}
    autoHideDuration={6000}
    onClose={() => setPasswordsMatchSnackbar(false)}
>
    <Alert onClose={handleCloseSnackbar} severity="warning">
        Passwords don't match
    </Alert>
</Snackbar>

2  Axios
axios
    .post("https://damp-ridge-27698.herokuapp.com/posts/", {
        image: image,
        title: title,
        tags: _tags,
        author: user._id,
    })
    .then((response) => {
    setPosts((prev) => [
    ...prev,
    { id: response.data._id, image: response.data.image }
    ]);
}

3  Firebase
firebase
    .storage()
    .ref(img.name)
    .put(img)
    .then((snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        progress === 100 &&
            firebase
            .storage()
            .ref(img.name)
            .getDownloadURL()
            .then((_url) => {
                setImage(_url);
                setLoaded(true);
    })

4  Material UI - TextField
<TextField
    label="username"
    color="secondary"
    defaultValue={user.name}
    className={classes.input}
    onChange={handleUsernameChange}
/>

5  TypeScript - Interface 
export interface menuDialogInterface {
  open: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  setOpen: (val: boolean) => void;
  setAlert: (val: boolean) => void;
  editUser: (val: { name: string; email: string }) => void;
}

6  Manterial UI/Formik - Validation 
const validateEmail = (value: string): string => {
  let error: string;
  if (!value) {
    error = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};