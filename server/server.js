const { request } = require("express")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Map = require("./models/map")
const morgan = require("morgan")
const cors = require("cors")

const URI = "mongodb+srv://admin:pass@cluster0.f03mu.mongodb.net/Cluster0?retryWrites=true&w=majority"

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected"))
.catch((e) => console.log(e))

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.post("/create", (req, res) => {
  // FORM
    // Nombre
    // Descripción

  // Recibo datos
  const name = req.body.name
  const description = req.body.description

  if (!name || !description) {
    return res.status(400).json({ status: "error", message: "Faltan datos del mapa" })
  }
  
  let map = new Map({ name, description })

  // Guardo datos
  map.save((error, object) => {
    if (error) return res.status(400).json({ status: "error", message: "Error al guardar en BD", error })

    res.json({ status: "success", message: "Guardado exitosamente", object })
  })
})

app.get("/map/:name", (req, res) => {
  const name = req.params.name

  if (!name) {
    return res.status(400).json({ status: "error", message: "Faltan nombre del mapa" })
  }

  Map.findOne({ name }, (error, document) => {
    if (error) return res.status(400).json({ status: "error", message: "Error al leer BD", error })
    
    if (!document) return res.status(404).json({ status: "error", message: "Map not found", error })

    res.json(document)
  })

})

app.get("/maps", (req, res) => {
  Map.find((error, documents) => {
    if (error) return res.status(400).json({ status: "error", message: "Error al leer BD", error })

    res.json(documents)
  })
})

app.listen(5000, () => {
  console.log(`Listening on port 5000`)
})