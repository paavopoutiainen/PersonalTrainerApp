import React, {useState, useEffect} from 'react';

import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import About from "./components/About"
import Customers from "./components/Customers"
import Trainings from "./components/Trainings"
import Calendar from "./components/Calendar"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { log } from 'util';
import Snackbar from '@material-ui/core/Snackbar';

function App() {

  const [customers, setCustomers] = useState([])
  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  //fetching the customerData
  function fetchCustomers(){
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(res => res.json())
    .then(res => setCustomers(res.content))
  }
  //fetching the trainingsData
  function fetchTrainings(){
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then(res => res.json())
    .then(res => setTrainings(res.content))
  }
  //After the first render
  useEffect(()=>{
    fetchCustomers()
    fetchTrainings()
  }
    , [])
  //delete customer
  function deleteCustomer(name, link){
    console.log("we here", name)
    if(window.confirm("are you sure?")){
      fetch(link, {method: "DELETE"})
      .then(res => fetchCustomers())
      .then(res => setMessage(`Customer ${name} deleted`))
      .then(res => setOpen(true))
    }
  } 

  //edit customer
  function editCustomer(editedCustomer, link){
    fetch(link, {method: "PUT", headers: {
        
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedCustomer)})
    .then(res => console.log("response",res))
    .then(res => fetchCustomers())
    .then(res => setMessage("Customer edited"))
    .then(res => setOpen(true))
    .catch(err => console.log(err))
  }

  //add customer
  function addCustomer(customer, link, name){
    fetch(link, {method: "POST", headers: {
        
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)})
    .then(res => fetchCustomers())
    .then(res => setMessage(`New customer ${name} added`))
    .then(res => setOpen(true))
  }

  //delete training
  function deleteTraining(link){
    if(window.confirm("are you sure?")){
      fetch(link, {method: "DELETE"})
      .then(fetchTrainings)
      .then(setMessage("Training deleted"))
      .then(setOpen(true))
    }
  }

  //add training
  function addTraining(training){
    const urlForTrainings = "https://customerrest.herokuapp.com/api/trainings"
    fetch(urlForTrainings, {method:"POST", headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(training)})
    .then(res => fetchTrainings())
    .then(res => setMessage("Added training for customer"))
    .then(res => setOpen(true))
  }


  function customerRender(){
    return (
      <Customers customers={customers} addCustomer={addCustomer} 
      deleteCustomer={deleteCustomer} editCustomer ={editCustomer} 
      addTraining={addTraining} deleteTraining={deleteTraining}></Customers>
    )
  }  
  function trainingsRender(){
    return (
      <Trainings trainings = {trainings} deleteTraining ={deleteTraining}></Trainings>
    )
  }

//Closing the snackbar 
  function handleClose(){
    setOpen(false)
  }

  return (
    <div>
      <BrowserRouter>
      <AppBar position="static">
      
      
        <Toolbar>
          <Typography variant="h6">
            Paavo's PT Company
          </Typography>
        </Toolbar>
      
        <div>
          <Link style={{color:"white"}} to="/">About</Link>
          <Link style={{color:"white"}} to="/customers" >Customers</Link>
          <Link style={{color:"white"}} to="/trainings">Trainings</Link>
          <Link style={{color:"white"}} to="/calendar">Calendar</Link>
        </div>
          
      </AppBar>
      
          <Switch>
            <Route exact path="/" component={About}></Route>
            <Route exact path="/customers" render={customerRender}></Route>
            <Route exact path="/trainings" render={trainingsRender}></Route>
            <Route exact path="/calendar" component={Calendar}></Route>
          </Switch>
     
      
      
      </BrowserRouter>
      <Snackbar open = {open} autoHideDuration={3000} onClose= {handleClose} message={message}/>

    </div>
  );
}

export default App;
