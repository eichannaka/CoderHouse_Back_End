export function login(req, res) {
  res.render("login");
}

export function register(req, res) {
  res.render("register");
}

export function profile(req, res) {
  res.render("profile", {
    user: req.session.user,
  });
}
