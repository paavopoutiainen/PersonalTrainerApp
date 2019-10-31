import React, {useState} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';



const Trainings = ({trainings, deleteTraining}) => {
 
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