import { create_new_user, reset_password_link, update_password, user_verify } from "../controllers/user.js";

const routes = (app) => {

    app.route('/signup')
        .get((req, res) => {
            res.send("GET SIGNUP FORM")
        })
        .post(create_new_user)

    app.route('/userverification/:verificationToken')
        .get(user_verify)

    app.route('/forgot_password')
        .post(reset_password_link)

    app.route('/update_password/:token')
        .get((req, res) => { res.send("Get update password page..") })

    app.route('/update_password')
        .post(update_password)


}

export default routes;