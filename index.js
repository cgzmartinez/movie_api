const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));

let users = [
  {
    id: 1,
    name: "Mary Beth"
  }
];

let movies = [
  {
    Title: "Parasite",
    Description:
      "The film follows a Korean family that attempt to be employed by the same wealthy family.",
    Genre: {
      Name: "Thriller"
    },
    Director: {
      Name: "Bong Joon-Ho",
      Bio: ""
    },
    Year: 2019
  },
  {
    Title: "Tenet",
    Description:
      "The film follows a CIA agent that learns to travel back in time in order to stop a future attack.",
    Genre: {
      Name: "Science Fiction"
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: ""
    },
    Year: 2020
  },
  {
    Title: "Minari",
    Description:
      "The film follows a Korean-American family that move to a small Arkansas farm for their own American dream.",
    Genre: {
      Name: "Drama"
    },
    Director: {
      Name: "Lee Isaac Chung",
      Bio: ""
    },
    Year: 2021
  },
  {
    Title: "The Godfather",
    Description:
      "The mafia film chronicles the Corleone Family, focusing on the transofrmation of the youngest son.",
    Genre: {
      Name: "Crime Drama"
    },
    Director: {
      Name: "Francis Ford Coppola",
      Bio: ""
    },
    Year: 1972
  },
  {
    Title: "John Wick",
    Description:
      "The film follows former assassin John Wick and his attempt to hunt down the ment that broke into his home and killed his puppy.",
    Genre: {
      Name: "Action"
    },
    Director: {
      Name: "Chad Stahelski",
      Bio: ""
    },
    Year: 2014
  },
  {
    Title: "Burning",
    Description:
      "The film depicts a young deliveryman who runs into his childhood friend, whom the deliveryman suspects is in danger.",
    Genre: {
      Name: "Mystery"
    },
    Director: {
      Name: "Lee Chang-Dong",
      Bio: ""
    },
    Year: 2018
  },
  {
    Title: "Oldboy",
    Description:
      "The film follows Oh Dae-Su who is imprisoned in a cell for 15 years without knowing why.",
    Genre: {
      Name: "Mystery"
    },
    Director: {
      Name: "Park Chan-Wook",
      Bio: ""
    },
    Year: 2005
  },
  {
    Title: "Memoir of a Murderer",
    Description:
      "A former serial killer fights to protect his daughter from her psychotic boyfriend.",
    Genre: {
      Name: "Thriller",
      Description: "Thriller is a suspense genre mixed with themes of..."
    },
    Director: {
      Name: "Won Shin-Yun",
      Bio: ""
    },
    Year: 2017
  },
  {
    Title: "Sicario",
    Description:
      "The film follows an FBI agent who is enlisted into a task force to bring down a Mexican drug cartel.",
    Genre: {
      Name: "Action"
    },
    Director: {
      Name: "Denis Villeneuve",
      Bio: ""
    },
    Year: 2015
  },
  {
    Title: "Everything Everywhere All at Once",
    Description:
      "The film follows a Chinese-American woman being audited by the IRS who discovers she must connect with parallel universe versions of herself.",
    Genre: {
      Name: "Science Fiction"
    },
    Director: {
      Name: "Daniel Kwan",
      Bio: ""
    },
    Year: 2022
  }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  res.json(
    users.find(user => {
      return user.name === req.params.name;
    })
  );
});

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing "name" in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id === parseInt(id)); // search user by id

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user found!");
  }
});

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id); //search user by id

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      title => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been Removed from ${user.name}'s array`);
  } else {
    res.status(400).send("No such user found!");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to myFlix App</h1>");
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title).Title;

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Movie not found");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre not found");
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName)
    .Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("Director not found");
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong!");
});

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id); //search user by id

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      title => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from ${user.name}'s array`);
  } else {
    res.status(400).send("No such movie found!");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`${user.name}'s account has been deleted!`);
  } else {
    res.status(400).send("No such user found!");
  }
});

app.listen(8080, () => {
  console.log("Your app is running on port 8080");
});
