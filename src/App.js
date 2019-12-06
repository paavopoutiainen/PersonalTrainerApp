import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Customers from "./components/Customers"
import Trainings from "./components/Trainings"
import CalendarPage from "./components/CalendarPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';

import axios from 'axios';


/*const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    backgroundColor: "#b3f3e6"
  },
}));*/


function App() {
  //const classes = useStyles();

  const [customers, setCustomers] = useState([])
  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  //fetching the customerData
  const fetchCustomers = async () => {
    try{
      const response = await axios.get("https://customerrest.herokuapp.com/api/customers")
      const customers = response.data.content
      setCustomers(customers)
    } catch(exception) {
      console.error(exception)
      setMessage(`Couldn't fetch customer data`)
      setOpen(true)
    }
  }
  //fetching the trainingsData, and changing the date format using moment.js
  const fetchTrainings = async () => {
    try{
      const response = await axios.get("https://customerrest.herokuapp.com/api/trainings")
      const trainings = response.data.content
      
      const formattedDatesTrainings = trainings.map(t => {
        var date = moment(t.date)
        return {...t, date: date.format("LLLL")} 
      })
      setTrainings(formattedDatesTrainings)
    } catch(exception) {
      console.error(exception)
      setMessage(`Couldn't fetch training data`)
      setOpen(true)
    }
    
  }
  //After the first render
  useEffect(()=>{
    fetchCustomers()
    fetchTrainings()
  }
    , [])
  //delete customer
  const deleteCustomer = async (name, link) => {
    if(window.confirm("are you sure?")){
      try{
        await axios.delete(link)
        fetchCustomers()
        setMessage(`Customer ${name} deleted`)
        setOpen(true)
      } catch (exception) {
        console.error(exception)
        setMessage(`Couldn't delete customer ${name}`)
        setOpen(true)
      }
      
    }
  }

  //edit customer
  const editCustomer = async (editedCustomer, link) => {
    try{
      await axios.put(link, editedCustomer)
      await fetchCustomers()
      setMessage("Customer edited")
      setOpen(true)
    } catch(exception) {
      console.error(exception)
      setMessage("Wasn't able to edit the customer")
      setOpen(true)
    }
    
  }
  //add customer
const addCustomer = async (customer, link) => {
  try{
    const response = await axios.post(link, customer)
    console.log(response)
    fetchCustomers()
    setMessage(`New customer ${response.data.firstname} ${response.data.lastname} added`)
    setOpen(true)
  } catch (exception) {
    console.error(exception)
    setMessage("Wasn't able to add customer")
    setOpen(true)
  }
}

  //delete training
  const deleteTraining = async (link, boolean) => {
    if(window.confirm("are you sure?")){
      try{
        await axios.delete(link)
      
        if(boolean){
          setMessage("Training deleted")
          setOpen(true)
        }
      }catch(exception){
        console.error(exception)
        setMessage("Couldn't delete the training")
        setOpen(true)
      }
      
    }
  }
  
  //add training
  const addTraining = async (customerName, training) => {
    try{
      await axios.post("https://customerrest.herokuapp.com/api/trainings", training)
      await fetchTrainings()
      setMessage(`Added training for customer ${customerName}`)
      setOpen(true)
    } catch (exception){
      console.error(exception)
      setMessage(`Couldn't add training for customer ${customerName}`)
      setOpen(true)
    }
    
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
      <Snackbar open = {open} autoHideDuration={3000} onClose= {handleClose} message={message}/>
      </Paper>
    </div>
  );
}

export default App;
