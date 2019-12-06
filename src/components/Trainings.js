import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import axios from "axios"
import moment from "moment"



const Trainings = ({deleteTraining}) => {
 
  //const [trainingsState, setTraining] = useState({customer: "", date: "", duration:"", activity:""})
  const [trainings, setTrainings] = useState([])

  //trainings = trainings.map(x => console.log('x', x))
  const fetchTrainings = async () => {
    const response = await axios.get("https://customerrest.herokuapp.com/gettrainings")
  
    const trainingsArray = response.data.map(t => {
      const date = moment(t.date)
      const customer = t.customer !== null ? `${t.customer.firstname} ${t.customer.lastname}`: null
      return { ...t, customer: customer, date: date.format("LLLL")}
    })
    setTrainings(trainingsArray)
  }

  useEffect(() => {
    fetchTrainings()
  }, [])

  const handleDeleteClick = (link) => {
    deleteTraining(link)
    fetchTrainings()
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