import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Buttons/Button';
import { config, CUSTOMER_API, token } from '../components/Helpers/Config';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { BsTrashFill, BsPencilFill} from 'react-icons/bs'
import { parseDate } from '../components/Helpers/Common';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'


const Home = () => {

  const [customers, setCustomers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    getAllCustomers()
  }, [])

  useEffect(() => {
    setStatusFilter('all')
    setIsSorted(false)
    let filtered = customers.filter(customer => (
      customer.name.toLowerCase().includes(searchField.toLowerCase())
    ))
    setFilteredCustomers(filtered)
  }, [searchField])

  useEffect(() => {
    let filtered = []
    switch(statusFilter){
      case('all'):
        setFilteredCustomers(customers)
        break;
      case('active'):
        filtered = customers.filter(customer => (
          customer.status === true
        ))
        setFilteredCustomers(filtered)
        break;
      case('inactive'):
        filtered = customers.filter(customer => (
          customer.status === false
        ))
        setFilteredCustomers(filtered)
        break;
    }
    
  }, [statusFilter])

  useEffect(() => {
    setStatusFilter('all')
    switch(isSorted){
      case(true):
        let sorted = [...sortedCustomers].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        setFilteredCustomers(sorted)
        break;
      case(false):
        setFilteredCustomers(customers) 
               
        break;
    }
  }, [isSorted])

  console.log(isSorted)
  console.log(filteredCustomers)
  
  const getAllCustomers = () => {
    return axios.get(
        CUSTOMER_API, config
      ).then(resp => {
        // console.log(resp.data.data)
        setCustomers(resp.data.data)
        setFilteredCustomers(resp.data.data)
        setSortedCustomers(resp.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleChangeSearch = (text) => {
    setSearchField(text)
  }

  const handleChangeStatus = (e) => {
    setStatusFilter(e.target.value)
  }

  const handleDelete = (customerId) => {
      Swal.fire({
          heightAuto: false,
          title: "Delete",
          text: `Are you sure you want to delete customer with ID ${customerId}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm",
      }).then((result) => {
          if (result.isConfirmed) {
              axios.delete(
                  CUSTOMER_API, {
                    headers: { 
                      'Authorization': token 
                  }, 
                    data: {
                      'id': customerId
                    }
                  }
              ).then((resp) => {
                  Swal.fire({
                      heightAuto: false,
                      title: 'Success', 
                      text: `Customer with ID ${customerId} has been deleted`, 
                      icon: 'success'
                  });
                  if (resp.status === 200) {
                      getAllCustomers()
                  }                    
              })
              .catch((err) => {
                  Swal.fire({
                      heightAuto: false,
                      title: 'Error', 
                      text: 'Cannot delete customer', 
                      icon: 'error'
                  });
                  console.log(err)
              })
          }
      });
  }

  const handleSort = () => {
    
    setIsSorted(!isSorted)
    
  }

  return (
    <div>
      <Navbar />
      <div className='p-10'>
        <div className='flex flex-row justify-between space-x-5 md:space-x-0'>
          <Link to={'/add'}>
            <Button text={'+ Add Customer'} />
          </Link>
          <input 
            placeholder='Search by name...'
            className='border-solid border-2 rounded-lg shadow-lg px-2'
            onChange={e => handleChangeSearch(e.target.value)}
          />
        </div>
        
        <div className='mt-5 p-2'>
          <table className='shadow-lg'>
            <thead className=''>
              <tr className='border-solid border-2 rounded-lg border-gray-100'>
                <th className=''>ID</th>
                <th className=''>
                  Name
                  <button onClick={handleSort}>
                    <TiArrowSortedUp className={isSorted ? `text-green-600` : `text-black`} />
                  </button>
                </th>
                <th>Address</th>
                <th>Country</th>
                <th>Phone</th>
                <th>Job</th>
                <th>
                  Status
                  <select
                    value={statusFilter}
                    onChange={handleChangeStatus}
                  >
                    <option value={'all'}>All</option>
                    <option value={'active'}>Active</option>
                    <option value={'inactive'}>Inactive</option>
                  </select>
                </th>
                <th>Created</th>
                <th>Updated</th>
                <th></th>
                <th className=''></th>
              </tr>
            </thead>
            
            <tbody>
            { 
                filteredCustomers && filteredCustomers.map((customer) => (
                  <tr key={customer.id} className='border-2 border-solid border-gray-100'>
                    <td>
                      <p className='bg-gray-100 rounded-full px-5 font-semibold'>{customer.id}</p>
                    </td>
                    <td className='font-semibold'>
                      {customer.name}
                    </td>
                    <td>{customer.address}</td>
                    <td>{customer.country}</td>
                    <td>{customer.phone_number}</td>
                    <td>{customer.job_title}</td>
                    <td className='text-center'>
                      {
                        customer.status ?  
                          <p className='rounded-full px-2 bg-green-600 text-white font-semibold'>
                            Active
                          </p> 
                          : 
                          <p className='rounded-full px-2 bg-red-600 text-white font-semibold'>
                            Inactive
                          </p>
                      }
                    </td>
                    <td className='text-center'>{parseDate(customer.created_at)}</td>
                    <td className='text-center'>{parseDate(customer.updated_at)}</td>
                    <td>
                      <Link 
                          to={`/customer/${customer.id}`}
                          state={{ props: customer }}
                      >
                        <button  className='border-2 border-solid p-2 rounded-full shadow-md'>
                          <BsPencilFill className='text-blue-800' />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button 
                          onClick={() => handleDelete(customer.id)}
                          className='border-2 border-solid p-2 rounded-full shadow-md'
                      >
                          <BsTrashFill className='text-red-700' />
                      </button>
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
          
      </div>
    </div>
  )
}

export default Home