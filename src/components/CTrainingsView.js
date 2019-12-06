import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReactTable from 'react-table'
import moment from 'moment'
import axios from "axios"
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const CTrainingsView = ({getTrainings, cRow, deleteTraining}) => {
    const customersTrainingsUrl = cRow
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [cTrainingData, setTrainingData] = useState([])
    const [booleanForFetch, setBoolean] = useState(false)
    //for snackbar
    const [message, setMessage] = useState("")
    const [openSnack, setOpenSnack] = useState(false)

    
    //fetch customer data
    const fetchCustomerTrainings = async () => {
      try{
        const response = await axios.get(customersTrainingsUrl)
        const data = response.data
        console.log(data)
        const filtered = data.content.filter(t => t.date !== undefined)
        const content = filtered.map(t => {
            var date =  moment(t.date)
            return {...t, date: date.format("LLLL") } 
        })
        setTrainingData(content)
      }catch(exception){
        console.error(exception)
      }
    }
      
    //to fetch only when the dialog is clicked open("trainings" button)
    if(booleanForFetch){
      fetchCustomerTrainings()
      setBoolean(false)
    }
    

    const columns = [{
        Header: 'Date',
        accessor: 'date' // String-based value accessors!
      }, {
        Header: 'Activity',
        accessor: 'activity'
      }, 
      {
        Header: 'Duration',
        accessor: "duration"
      },
      {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 75,
        Cell: row => <Button color="secondary" size ="small" 
        onClick={() => handleDeleteClick(row.original.links[1].href)}>Delete</Button>
    }
    ]
    const handleDeleteClick = async (link) => {
      try{
        await deleteTraining(link, false)
        fetchCustomerTrainings()
        setMessage("Training deleted")
        setOpenSnack(true)
      }catch(exception) {
        console.error(exception)
        setMessage("wasn't able to delete the training")
        setOpenSnack(true)
      }
    }
    const handleClickOpen = () => {
        setOpen(true);
        setBoolean(true)
        console.log("linkki", customersTrainingsUrl)
      };
    
      const handleCloseDialog = async () => {
        await getTrainings()
        setOpen(false);
      };

      const handleClose = () => {
        setOpenSnack(false)
      }


    return (
        
    <div>
            
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Trainings
      </Button>
      <Dialog fullScreen open={open} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Customers trainings
            </Typography>
          </Toolbar>
        </AppBar>
        <ReactTable data = {cTrainingData} columns = {columns}></ReactTable>
      </Dialog>
      <Snackbar open = {openSnack} autoHideDuration={3000} onClose= {handleClose} message={message}/>


    </div>
  );
};

export default CTrainingsView;