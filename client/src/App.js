import { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'

const App = () => {

  const [maps, setMaps] = useState([])
  const [selectedMap, setSelectedMap] = useState("") 
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const { name, description } = formData

  
  useEffect(() => {
    getAllMaps()
  }, [])

  const getAllMaps = async () => {
    const { data } = await axios.get("http://localhost:5000/maps")
    setMaps(data)
  }

  const handleInputChange = value => event => {
    setFormData({...formData, [value]: event.target.value})
  }

  const addMap = async () => {
    if (!name.trim() || !description.trim()) return

    const { data } = await axios.post("http://localhost:5000/create", formData)

    console.log(data.object)

    setFormData({ name: "", description: "" })
    setMaps(maps.concat(data.object))

  }
  
  return (
    <div>
      <div className="form">
        <form onSubmit={addMap}>
          <input onChange={handleInputChange("name")} value={name} placeholder="name"></input>
          <input onChange={handleInputChange("description")} value={description} placeholder="description"></input>
          <input type="submit" placeholder="description"></input>
        </form>
      </div>
      <div className="maps">
        {
          maps.map(mapObject => (
            <h3 onClick={() => setSelectedMap(mapObject.description)} key={mapObject._id}>{mapObject.name}</h3>
          ))
        }
      </div>
      <div>
        <p>{selectedMap ? selectedMap : "Selecciona un mapa"}</p>
      </div>
    </div>
  )
}

export default App
