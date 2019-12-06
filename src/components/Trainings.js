import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import axios from "axios"
import moment from "moment"

const Trainings = ({getTrainings, deleteTraining}) => {
 
  //const [trainingsState, setTraining] = useState({customer: "", date: "", duration:"", activity:""})
  const [trainings, setTrainings] = useState([])

  //trainings = trainings.map(x => console.log('x', x))
  const fetchTrainingsWithCustomerData = async () => {
    try{
      const response = await axios.get("https://customerrest.herokuapp.com/gettrainings")
      const trainingsArray = response.data.map(t => {
      const date = moment(t.date)
      const customer = t.customer !== null ? `${t.customer.firstname} ${t.customer.lastname}`: null
      return { ...t, customer: customer, date: date.format("LLLL")}
    })
    setTrainings(trainingsArray)
    }catch(exception){
      console.error(exception)
    }
    
  }
//here we fetch the trainings with customers and set them to the state of this component
  useEffect(() => {
    fetchTrainingsWithCustomerData()
  }, [])
 //this hook is called when the component is removed from the ui
 //here we update the training state in App.js since the calendar component is receiving that state as a prop when it is mounted
  useEffect(() => {
    return () => {
     getTrainings()
    }
  })

  const handleDeleteClick = async (link) => {
    await deleteTraining(link, true)
    fetchTrainingsWithCustomerData()
  }
  

  const baseUrlForDeletingTrainings = "https://customerrest.herokuapp.com/api/trainings/"

  const columns = [
    {
      Header: 'Customer',
      accessor: 'customer' // String-based value accessors!
    },
  {
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
    onClick={() => handleDeleteClick(`${baseUrlForDeletingTrainings}/${row.original.id}`)
     }>Delete</Button>
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