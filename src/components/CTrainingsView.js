import React, {useState, useEffect} from 'react';
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
  

const CTrainingsView = ({cRow, deleteTraining}) => {
    const customersTrainingsUrl = cRow
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [cTrainingData, setTrainingData] = useState([])

    //fetchData Of the customer
    function fetchCustomerTrainings(){
        return fetch(customersTrainingsUrl)
        .then(res => res.json())
        .then(res => {
          let content = res.content.map(t => {
            var date = moment(t.date)
            return {...t, date: date.format("LLLL")} 
          })
          return content
        })
    }
  
    //After render
    useEffect(()=>{
      //let isSubscribed = true;
      //if(isSubscribed){
        fetchCustomerTrainings().then(customers => {
          //if(isSubscribed){
            setTrainingData(customers)
          //}
        })
      //}
        
        //return () => (isSubscribed = false);
      }, []
        )

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
            
          </Toolbar>
        </AppBar>
        <ReactTable data = {cTrainingData} columns = {columns}></ReactTable>
      </Dialog>
    </div>
            
        
    );
};

export default CTrainingsView;