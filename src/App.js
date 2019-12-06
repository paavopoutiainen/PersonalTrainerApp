import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import About from "./components/About"
import Customers from "./components/Customers"
import Trainings from "./components/Trainings"
import CalendarPage from "./components/CalendarPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    backgroundColor: "#b3f3e6"
  },
}));


function App() {
  const classes = useStyles();

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
  //fetching the trainingsData, and changing the date format using moment.js
  function fetchTrainings(){
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then(res => res.json())
    .then(res => {
      let content = res.content.map(t => {
        var date = moment(t.date)
        return {...t, date: date.format("LLLL")} 
      })
      return setTrainings(content)
 
    })
    
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
  const deleteTraining = async (link, boolean) => {
    if(window.confirm("are you sure?")){
      await axios.delete(link)
      
      if(boolean){
        setMessage("Training deleted")
        setOpen(true)
      }
    }
  }
  
  //add training
  function addTraining(customerName, training){
    console.log("harkka", training)
    
    const urlForTrainings = "https://customerrest.herokuapp.com/api/trainings"
    fetch(urlForTrainings, {method:"POST", headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(training)})
    .then(res => fetchTrainings())
    .then(res => setMessage(`Added training for customer ${customerName}`))
    .then(res => setOpen(true))
  }


  function customerRender(){
    return (
      <Customers getTrainings={fetchTrainings} customers={customers} addCustomer={addCustomer} 
      deleteCustomer={deleteCustomer} editCustomer ={editCustomer} 
      addTraining={addTraining} deleteTraining={deleteTraining} setOpenSnack={setOpen}></Customers>
    )
  }  
  function trainingsRender(){
    return (
      <Trainings getTrainings={fetchTrainings} deleteTraining = {deleteTraining}></Trainings>
    )
  }

  function calendarRender(){
    return <CalendarPage trainings={trainings}></CalendarPage>
  }

//Closing the snackbar 
  function handleClose(){
    setOpen(false)
  }

  return (
    <div>
      <Paper className="paper">
      <BrowserRouter>
      <AppBar className="appBar" position="static">
      
      
        <Toolbar>
          <Typography variant="h6" styles={{marginLeft: 0}}>
            Paavo's PT Company
          </Typography>
        </Toolbar>
      
        <div>
          
          <Link className="links" to="/customers" >Customers</Link>
          <Link className="links" to="/trainings">Trainings</Link>
          <Link className="links" to="/calendar">Calendar</Link>
        </div>
          
      </AppBar>
      
          <Switch>
            <Route exact path="/" render={customerRender}></Route>
            <Route exact path="/customers" render={customerRender}></Route>
            <Route exact path="/trainings" render={trainingsRender}></Route>
            <Route exact path="/calendar" render={calendarRender}></Route>
          </Switch>
     
      
      
      </BrowserRouter>
      <Snackbar open = {open} autoHideDuration={1500} onClose= {handleClose} message={message}/>
      </Paper>
    </div>
  );
}

export default App;
