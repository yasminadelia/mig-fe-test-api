import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Button from '../components/Buttons/Button'
import { config, CUSTOMER_API } from '../components/Helpers/Config'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from "react-router-dom";

const EditCustomer = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const { props } = location.state

	const [name, setName] = useState(props.name)
	const [address, setAddress] = useState(props.address)
	const [country, setCountry] = useState(props.country)
	const [phoneNumber, setPhoneNumber] = useState(props.phone_number)
	const [jobTitle, setJobTitle] = useState(props.job_title)
	const [status, setStatus] = useState(props.status)

	const onStatusChange = (e) => {
	 setStatus(e.target.value)
	}

	const data = {
	"id": props.id,
	 "name": name,
	 "address" : address,
	 "country": country,
	 "phone_number" : phoneNumber,
	 "job_title": jobTitle,
	 "status": status
	}

	const handleSubmit = async () => {
	 Swal.fire({
			heightAuto: false,
			title: "Submit",
			text: `Are you sure you want to update this customer data?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Confirm",
	 }).then((result) => {
			if (result.isConfirmed) {
				axios.put(
					 CUSTOMER_API,
					 data,
					 config
				)
				.then((resp) => {
					 // console.log(resp)
					 navigate("/");
					 Swal.fire({
							title: "Success",
							text: "Customer has been updated",
							icon: "success",
					 })
				}).catch((err) => {
					 Swal.fire({
							heightAuto: false,
							title: 'Error',
							text: 'Cannot update customer data',
							icon: 'error'
					 });
					 console.log(err)
				})
			}
	 })}


		return (
		<div>
			<Navbar />
			<div className='p-10'>
				<p className='text-xl font-bold text-center'>Customer #{props.id}</p>
				<form
					className='grid grid-cols-1 gap-2 mb-5'
				>
					<label>
						Name :
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label>
						Address :
					</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<label>
						Country :
					</label>
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
					<label>
						Phone Number :
					</label>
					<input
						type="text"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<label>
						Job Title :
					</label>
					<input
						type="text"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
					/>
					<label className=''>
						Status :
					</label>
					<select
						value={status}
						onChange={onStatusChange}
					>
						<option value={false}>Inactive</option>
						<option value={true}>Active</option>
					</select>
				</form>
				<Button text={'Submit'} onClick={() => handleSubmit()}/>
			</div>
		</div>
	)
}

export default EditCustomer