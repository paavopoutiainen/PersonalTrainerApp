import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditCustomer = ({customer, editCustomer}) => {
    const[open, setOpen] = useState(false)
    const[customerState, setCustomer] = useState({firstname: "", lastname:"", streetaddress:"", postcode:"",
city:"", email:"", phone:""})


    function handleClickOpen() {
        setCustomer({firstname: customer.firstname, lastname:customer.lastname, streetaddress:customer.streetaddress,
             postcode:customer.postcode, city:customer.city, email:customer.email, phone:customer.phone})
        console.log(customer)
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
    }

    function handleChange(e){
        setCustomer({...customerState, [e.target.name] : e.target.value})
        console.log(customerState)
    }
    function handleCloseSave(){
        setOpen(false)
        editCustomer(customerState, customer.links[1].href)
        
    }
    return (
        <div>
        <Button size = "small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the information of the customer
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
        </div>
    );
};

export default EditCustomer;