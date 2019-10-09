import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddTraining from "./AddTraining"
import ReactTable from 'react-table'


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
  

const CTrainingsView = ({cRow, addTraining, deleteTraining}) => {
    const customersTrainingsUrl = cRow.links[2].href
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [cTrainingData, setTrainingData] = useState([])

    //fetchData Of the customer
    function fetchCustomerTrainings(){
        fetch(customersTrainingsUrl)
        .then(res => res.json())
        .then(res => setTrainingData(res))
    }
   

    //After render
    useEffect(()=>{
        
      }
        , [])

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
        onClick={() => deleteTraining(row.original.links[1].href)}>Delete</Button>
    }
    ]

    
    const handleClickOpen = () => {
        setOpen(true);
        console.log("linkki", customersTrainingsUrl)
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    return (
    <div>
            
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Trainings
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Customers trainings
            </Typography>
            <AddTraining link={cData.links[1].href} addTraining={addTraining}></AddTraining>
          </Toolbar>
        </AppBar>
        <ReactTable data = {cTrainingData} columns = {columns}></ReactTable>
      </Dialog>
    </div>
            
        
    );
};

export default CTrainingsView;