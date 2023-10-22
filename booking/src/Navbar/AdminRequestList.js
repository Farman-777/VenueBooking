import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRequestList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8003/getDJData")
      .then(result => {
        console.log(result.data);
        setData(result.data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = (requestId) => {
    const updatedRequests = data.map((request) => request._id === requestId ? { ...request, Status: 'accepted' } : request);
    setData(updatedRequests);
  };

  const handleReject = (requestId) => {
    const updatedRequests = data.map((request) => request._id === requestId ? { ...request, Status: 'rejected' } : request);
    setData(updatedRequests);
  };

  const handleStatusChange = (userId) => {
    Swal.fire({
      title: 'Update DJ Status',
      text: 'Are you sure you want to update the DJ status to "accepted"?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8003/updateDJStatus/${userId}`, { newStatus: "accepted" })
          .then((response) => {
            // Handle the response as needed
            Swal.fire('Updated!', 'DJ status has been updated.', 'success');
            fetchData(); // Fetch the updated data to refresh the component
          })
          .catch((error) => {
            // Handle the error
            Swal.fire('Error', 'Failed to update DJ status', 'error');
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Request List</h1>
      <table className="table table-bordered shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Description</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.entityType}</td>
              <td>{request.DJName}</td>
              <td>₹{request.DJPrice}</td>
              <td>
                <textarea
                  rows="3"
                  value={request.DJDescription}
                />
              </td>
              <td>{request.DJEmail}</td>
              <td>{request.Status}</td>
              <td>
                {request.Status === 'pending' && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => { handleAccept(request._id); handleStatusChange(request._id) }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestList;
