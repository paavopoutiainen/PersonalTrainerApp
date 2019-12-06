import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EditCustomer from "./EditCustomer"
import Button from '@material-ui/core/Button';
import AddTraining from "./AddTraining"
import AddCustomer from "./AddCustomer"
import CTrainingsView from "./CTrainingsView"



const Customers = ({getTrainings, setOpenSnack, customers, deleteCustomer, editCustomer, addCustomer, addTraining, deleteTraining}) => {
 
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
    Cell: row => <AddTraining setOpenSnack={setOpenSnack} dataOfCustomer={row.original} addTraining={addTraining}></AddTraining>
  },
  {
    accessor: "",
    filterable: false,
    sortable: false,
    width: 125,
    Cell: row => <CTrainingsView getTrainings={getTrainings} cRow={row.original.links[2].href} deleteTraining={deleteTraining}></CTrainingsView>
  }
]

  return (
      <div>
        <AddCustomer addCustomer={addCustomer} ></AddCustomer>
        <ReactTable 
          data={customers}
          columns={columns}
          filterable={true}
        />
      </div>
    );
};

export default Customers;