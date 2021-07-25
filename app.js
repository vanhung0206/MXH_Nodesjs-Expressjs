var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
const MongoStore = require("connect-mongo");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var membersRouter = require("./routes/members");
var groupsRouter = require("./routes/groups");
var blogsRouter = require("./routes/blogs");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");

// connect db
var db = require("./config/db");

db();

var app = express();
app.use(
    session({
        secret: "vanhung",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost/socialnetwork",
        }),
        cookie: { secure: false, maxAge: 600000 },
    })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout extractScripts", true);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/login", loginRouter);
app.use(function (req, res, next) {
    if (req.session.userInfo) next();
    else {
        res.redirect("/login");
    }
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/members", membersRouter);
app.use("/groups", groupsRouter);
app.use("/blogs", blogsRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
