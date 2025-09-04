const Auth = (req, res, next) => {
  //verifying the admin creadintials
  const Token = "adminCredintials";
  const Acess = Token === "adminCredintials" ? 1 : 0;
  if (Acess) {
    next();
  } else {
    res.status(401).send("Acess is Denied");
  }
};

module.exports = {
    Auth
}