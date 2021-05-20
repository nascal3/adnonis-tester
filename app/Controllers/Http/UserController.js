'use strict'

const User = use ('App/Models/User')

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(request.only(['username', 'email', 'password']));
    await auth.login(user);
    return response.redirect('/');
  }

  async login({request, response, auth, session}) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect('/');
    } catch (err) {
      session.flash({ loginError: 'Username or password is wrong!' });
      response.redirect('/login');
    }
  }
}

module.exports = UserController
