import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EditCustomer from "./EditCustomer"
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTraining from "./AddTraining"
import CTrainingsView from "./CTrainingsView"



const Customers = ({customers, deleteCustomer, editCustomer, addCustomer, addTraining}) => {

  const [open, setOpen] = useState(false)
  const [customerState, setCustomer] = useState({firstname: "", lastname:"", streetaddress:"", postcode:"",
  city:"", email:"", phone:""})

  const baseUrlForCustomers = "https://customerrest.herokuapp.com/api/customers"

  const columns = [{
    Header: 'First name',
    accessor: 'firstname' // String-based value accessors!
  }, {
    Header: 'Last name',
    accessor: 'lastname'
    
  }, 
  {
    Header: 'Street address',
    accessor: "streetaddress"
  }, 
  {
    Header: "Post code",
    accessor: "postcode"
  }, 
  {
    Header: "City",
    accessor: "city"
  }, 
  {
    Header: "Email",
    accessor: "email"
  }, 
  {
    Header: "Phone",
    accessor: "phone",
    filterable:false
  },
  {
    
    accessor: "",
    filterable: false,
    sortable: false,
    width: 75,
    Cell: row => <EditCustomer customer = {row.original} editCustomer={editCustomer}>Delete</EditCustomer>
},
  {
    
    accessor: "",
    filterable: false,
    sortable: false,
    width: 75,
    Cell: row => <Button color="secondary" size ="small" 
    onClick={() => deleteCustomer(row.original.firstname + " "+ row.original.lastname, row.original.links[1].href)}>Delete</Button>
},
{
  
  accessor: "",
  filterable: false,
  sortable: false,
  width: 125,
  Cell: row => <CTrainingsView link={row.original.links[1].href} addTraining={addTraining}></CTrainingsView>
    
}
]
//open form dialog
function handleClickOpen(){
  setOpen(true)
}
//close the form
function handleClose(){

}
//save textfield inputs into state
function handleChange(e){
  setCustomer({...customerState, [e.target.name]: e.target.value})
}

//Call addCustomerFunction when save button clicked
function handleCloseSave(){
  addCustomer(customerState, baseUrlForCustomers, `${customerState.firstname} ${customerState.lastname}`)
  setOpen(false)
  setCustomer({firstname: "", lastname:"", streetaddress:"", postcode:"",
  city:"", email:"", phone:""})
}
   
    return (
      <div>
      <Button size = "small" color="primary" onClick={handleClickOpen}>
        Add
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give information of customer
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            label="Firstname"
            fullWidth
            onChange = {e => handleChange(e)}
            value = {customerState.firstname}
          />
          <TextField
           
            margin="dense"
            name="lastname"
            label="Lastname"
            fullWidth
            onChange = {e => handleChange(e)}
            value = {customerState.lastname}
          />
          <TextField
           
           margin="dense"
           name="streetaddress"
           label="Street address"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {customerState.streetaddress}
         />
         <TextField
           
           margin="dense"
           name="postcode"
           label="Post code"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {customerState.postcode}
         />
         <TextField
           
           margin="dense"
           name="city"
           label="City"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {customerState.city}
         />
         <TextField
           
           margin="dense"
           name="email"
           label="Email"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {customerState.email}
         />
         <TextField
           
           margin="dense"
           name="phone"
           label="Phone"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {customerState.phone}
         />

      </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ReactTable 
        data={customers}
        columns={columns}
        filterable={true}
      />
      
      </div>
      
  
     
    );
};

export default Customers;