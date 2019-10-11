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
import moment from 'moment'


const Trainings = ({trainings, deleteTraining}) => {
  const [open, setOpen] = useState(false)
  const [trainingsState, setTraining] = useState({date: "", duration:"", activity:""})
  

  //trainings = trainings.map(x => console.log('x', x))
  console.log("trainings", trainings)

  const baseUrlForTrainings = "https://customerrest.herokuapp.com/api/trainings"

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


    return (
      <div>
      
      <ReactTable 
        data={trainings}
        columns={columns}
        filterable={true}
      />
      
      </div>
      
  
     
    );
}

export default Trainings;