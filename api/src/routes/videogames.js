const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const apiRequest = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name.toLowerCase()}`
    );
    const dbRequest = Videogame.findAll({
      where: {
        name,
      },
    });
    try {
      Promise.all([apiRequest, dbRequest]).then(([apiRes, dbRes]) => {
        const mapData = apiRes.data.results.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genre: e.genres,
          rating: e.rating
        }));
        const finalList = dbRes.concat(mapData);
        res.json(finalList);
      });
    } catch (error) {
      res.status(404).send("Game not found");
    }
  } else {
    //   const apiRequest = axios.get(
    //     `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`
    //   );

    //   Promise.all([apiRequest, dbRequest]).then(([apiRes, dbRes]) => {
    //     const mapData = apiRes.data.results.map((e) => ({
    //       id: e.id,
    //       name: e.name,
    //       image: e.background_image,
    //       genre: e.genres,
    //     }));
    //     const finalList = dbRes.concat(mapData);
    //     res.json(finalList);
    //   });
    // }

    try {
      let i = 1;
      let gamePromise = [];
      while (i <= 5) {
        let currentUrl = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20&page=${i}`)
        let apiInfo = currentUrl.then((res) => res.data.results.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genre: e.genres.map((g) => ({id: g.id, name: g.name})),
          rating: e.rating,
          order: e.added,
        })))
        i++;
        gamePromise = [...gamePromise, apiInfo]
      }
      const dbGames = Videogame.findAll();
      gamePromise.concat(dbGames);
      // console.log(dbGames)
      await Promise.all(gamePromise)
      .then(([a, b, c, d, e, f]) => {
        const response = a.concat(b, c, d, e)
        if(f){
          response.concat(f)
        }
        res.send(response)
      })
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  const newVideogame = await Videogame.create(req.body);
  res.status(201).send(newVideogame);
});

module.exports = router;
