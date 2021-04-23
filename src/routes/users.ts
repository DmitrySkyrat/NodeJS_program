import {Router, Request, Response} from "express";
import {getAutoSuggestUsers} from "../services/user.service";
import {userQuerySchema, UserRequestBodySchema} from "../validationSchemes/schemes";
import {ValidatedRequest, createValidator, ExpressJoiInstance} from "express-joi-validation";

const router = Router();
const mongoose = require("mongoose");
const validator: ExpressJoiInstance = createValidator({
  passError: true
});
const User = mongoose.model("User", {
  id: String,
  login: String,
  password: String,
  age: Number,
  isDeleted: Boolean,
});
const USERS_LIMIT: number = 5;
const loginSubstring: string = 'ill';

router.get("/users", (req: Request, res: Response) => {
  User.find({}, (error, users) => {
    if(error) return console.log(error);
    const filteredUsers = getAutoSuggestUsers(users, loginSubstring, USERS_LIMIT);

    res.json(filteredUsers);
  });
});

router.get("/users/:id", (req: Request, res: Response) => {
  User.find({ id: req.params.id }, (error, message) => {
    if(error) return console.log(error);
    
    res.json(message);
  });
});

router.post("/users", validator.body(userQuerySchema), (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
    const newUser = new User(req.body);
    newUser.save();
    res.json(newUser);

    console.log("user is created");
  }
);

router.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  User.findOneAndUpdate({ id: id }, { isDeleted: true }, (error, user) => {
    if(error) return console.log(error);
    res.json(user);
  });
});

router.put("/users/:id", validator.body(userQuerySchema), (req: ValidatedRequest<UserRequestBodySchema>, res: Response) => {
  const newUser = {
    id: req.body.id,
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: req.body.isDeleted,
  };

  User.findOneAndUpdate({ id: req.params.id }, newUser, (error, user) => {
    if(error) return console.log(error);
    res.json(user);
  });
});

module.exports = router;
