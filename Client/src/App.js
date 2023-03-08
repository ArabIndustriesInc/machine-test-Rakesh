import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { Grid } from '@mui/material';


function App() {
  const [loading, SetLoading] = useState(true)
  const [screen, SetScreen] = useState("list")
  const [object, SetObject] = useState({})
  const [arr, setArr] = useState([])
  useEffect(() => {

    async function loadData() {
      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/list',
        headers: {}
      };

      axios(config)
        .then(function (response) {
          setArr(response?.data?.items)
          console.log(response?.data?.items?.length)
          if (response?.data) {
            SetLoading(false)
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
    loadData()

  }, [])

  if (loading) {
    return (
      <div className="App">
        Loading ...
      </div>
    );
  }

  function onOptionChangeHandler (option){
    console.log(option.target.value)
   
    switch (option.target.value) {
      case 'Year wise':
        
        setArr([].concat(arr).sort((a, b) => a.year - b.year))
        break;
      case 'Rank wise':
        setArr([].concat(arr).sort((a, b) => a.rank - b.rank))
        
        break;
      default:
        setArr([].concat(arr).sort((a, b) => a._id - b._id))
        
        break;
    }
    
  }
  function onSelect(index) {
    const obj = arr[index]
    SetObject(obj)
    console.log(index)
    SetScreen("details")
  }
  function goBack() {
    SetScreen("list")
  }
  if (screen === "details") {
    return (
      <Details object={object} goBack={goBack} />
    )
  }
  if (screen === "list") {
    return (
      <div className="App">
        {/* A flexbox container represented in an MUI Grid container */}
        <select onChange={onOptionChangeHandler}>
          <option>Upload wise</option>
          <option>Year wise</option>
          <option>Rank wise</option>
        </select>
        <Grid container>
          {/* A Child grid container */}
          {arr.map((elem, index) => {
            return <Item item={elem} index={index} onSelect={onSelect}  />
          })}
        </Grid>
      </div>
    );
  }


}

function Item({ item, index, onSelect }) {
  
  return (
    <Grid item xs={12} sm={6} md={4} ls={3}>
      <div style={{ height: '150px', alignItems: "center", backgroundColor: "#4848c8", margin: "10px" }}>
        {item.name} <br />
        <p> Rank : {item.rank} </p>
        <p > Year : {item.year} </p>
        <button onClick={()=> {onSelect(index)}}>Show details</button>
      </div>
    </Grid>
  )
}

function Details ({object, goBack}) {
  return (
    <div style={{width:'100%', height:"100%", paddingLeft:"50px"}}>
      {/* A flexbox container represented in an MUI Grid container */}
      <button onClick={goBack}>Go Back</button>
      <p>Name  : {object.name}</p>
      <p>Year  : {object.year}</p>
      <p>Rank  : {object.rank}</p>
      <p>Genre : {object.genre}</p>
      <p>Directors : {object.directors}</p>
      <p>Wrtiters  : {object.writers}</p>
    </div>
  );
}

export default App;
