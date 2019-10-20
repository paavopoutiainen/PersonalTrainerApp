import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddTraining = ({setOpenSnack, dataOfCustomer, addTraining}) => {

    const[open, setOpen] = useState(false)
    const [training, setTraining] = useState({date:"", activity:"", duration :"", customer:dataOfCustomer.links[1].href})


    let nameOfTheCustomer = `${dataOfCustomer.firstname} ${dataOfCustomer.lastname}`

    function handleClickOpen(){
      
        setOpen(true)
        setOpenSnack(false)
        console.log("addtrainigissä", dataOfCustomer)
    }
    function handleClose(){
        setOpen(false)
    }

    function handleChange(e){
        setTraining({...training, [e.target.name]: e.target.value}) 
    }
    function handleCloseSave(){
        addTraining(nameOfTheCustomer, training)
        setOpen(false)
    }

    return (
        <div>
        <Button size = "small" color="default" onClick={handleClickOpen}>
        Add Training
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add training for the customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give information of the training
          </DialogContentText>
          <TextField
            autoFocus
            type="date"
            placeholder="Use form: year-month-day"
            margin="dense"
            name="date"
            label="Date"
            fullWidth
            onChange = {e => handleChange(e)}
            value = {training.date}
          />
          <TextField
           
            margin="dense"
            name="activity"
            label="Activity"
            fullWidth
            onChange = {e => handleChange(e)}
            value = {training.activity}
          />
          <TextField
           
           margin="dense"
           name="duration"
           label="Duration"
           fullWidth
           onChange = {e => handleChange(e)}
           value = {training.duration}
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

export default AddTraining;