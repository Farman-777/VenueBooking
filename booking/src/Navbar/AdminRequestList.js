import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AdminRequestList = () => {
  const { isAuthenticated } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8003/getDJData").then((result) => {
      console.log(result.data);
      setData1(result.data);
    });

    axios.get("http://localhost:8002/getCaterData").then((result) => {
      console.log(result.data);
      setData2(result.data);
    });
    axios.get("http://localhost:8000/getData").then((result) => {
      console.log(result.data);
      setData3(result.data);
    });
    axios.get("http://localhost:8001/getPhotoData").then((result) => {
      console.log(result.data);
      setData4(result.data);
    });
  };

  useEffect(() => {
    fetchData();
    if (!isAuthenticated) {
      Swal.fire({
        icon: "error", // Note the lowercase 'e' in 'error'
        title: "User Not Logged in",
        text: "Please Log in!",
      });
    }
  }, []);

  const handleAcceptDJ = (requestId) => {
    const updatedRequestsDJ = data1.map((request) =>
      request._id === requestId ? { ...request, Status: "accepted" } : request
    );
    setData1(updatedRequestsDJ);
  };

  // const handleReject = (requestId) => {
  //   const updatedRequests = data1.map((request) =>
  //     request._id === requestId ? { ...request, Status: "rejected" } : request
  //   );
  //   setData1(updatedRequests);
  // };


  const handleRejectDJ = (requestId) => {
    const updatedRequestsDJ = data1.map((request) =>
      request._id === requestId ? { ...request, Status: "rejected" } : request
    );
    setData1(updatedRequestsDJ);
  
    // Now, make an API call to delete the rejected request
    axios.delete(`http://localhost:8003/deleteDJRequest/${requestId}`)
      .then((response) => {
        // Handle the response if needed
        console.log("Request deleted:", response.data);
  
        // Display a success notification
        Swal.fire({
          icon: 'success',
          title: 'Request Deleted',
          text: 'The request has been deleted successfully.',
        });
      })
      .catch((error) => {
        // Handle the error
  
        // Display an error notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the request.',
        });
  
        console.error("Failed to delete request:", error);
      });
  };

  const handleAcceptCater = (requestId) => {
    const updatedRequestsCater = data2.map((request) =>
      request._id === requestId ? { ...request, Status: "accepted" } : request
    );
    setData2(updatedRequestsCater);
  };

  // const handleRejectCater = (requestId) => {
  //   const updatedRequestsCater = data2.map((request) =>
  //     request._id === requestId ? { ...request, Status: "rejected" } : request
  //   );
  //   setData2(updatedRequestsCater);
  // };

  const handleRejectCater = (requestId) => {
    const updatedRequestsCater = data2.map((request) =>
      request._id === requestId ? { ...request, Status: "rejected" } : request
    );
    setData2(updatedRequestsCater);
  
    // Now, make an API call to delete the rejected request
    axios.delete(`http://localhost:8002/CaterRequest/${requestId}`)
      .then((response) => {
        // Handle the response if needed
        console.log("Request deleted:", response.data);
  
        // Display a success notification
        Swal.fire({
          icon: 'success',
          title: 'Request Deleted',
          text: 'The request has been deleted successfully.',
        });
      })
      .catch((error) => {
        // Handle the error
  
        // Display an error notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the request.',
        });
  
        console.error("Failed to delete request:", error);
      });
  };
  const handleAcceptVenue = (requestId) => {
    const updatedRequestsVenue = data3.map((request) =>
      request._id === requestId ? { ...request, Status: "accepted" } : request
    ); 
    setData3(updatedRequestsVenue);
  };

  // const handleRejectVenue = (requestId) => {
  //   const updatedRequestsVenue = data3.map((request) =>
  //     request._id === requestId ? { ...request, Status: "rejected" } : request
  //   );
  //   setData3(updatedRequestsVenue);
  // };


  const handleRejectVenue = (requestId) => {
    const updatedRequestsVenue = data3.map((request) =>
      request._id === requestId ? { ...request, Status: "rejected" } : request
    );
    setData3(updatedRequestsVenue);
  
    // Now, make an API call to delete the rejected request
    axios.delete(`http://localhost:8000/deleteVenueRequest/${requestId}`)
      .then((response) => {
          Swal.fire({
          icon: 'success',
          title: 'Request Deleted',
          text: 'The request has been deleted successfully.',
        });
      })
      .catch((error) => {
        // Handle the error
  
        // Display an error notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the request.',
        });
  
        console.error("Failed to delete request:", error);
      });
  };


  const handleAcceptPhotographer = (requestId) => {
    const updatedRequestsPhotographer = data4.map((request) =>
      request._id === requestId ? { ...request, Status: "accepted" } : request
    );
    setData4(updatedRequestsPhotographer);
  };

  // const handleRejectPhotographer = (requestId) => {
  //   const updatedRequestsPhotographer = data4.map((request) =>
  //     request._id === requestId ? { ...request, Status: "rejected" } : request
  //   );
  //   setData4(updatedRequestsPhotographer);
  // };
  const handleRejectPhotographer = (requestId) => {
    const updatedRequestsPhotographer = data4.map((request) =>
      request._id === requestId ? { ...request, Status: "rejected" } : request
    );
    setData4(updatedRequestsPhotographer);
  
    // Now, make an API call to delete the rejected request
    axios.delete(`http://localhost:8001/deletePhotographerRequest/${requestId}`)
      .then((response) => {
        // Handle the response if needed
        console.log("Request deleted:", response.data);
  
        // Display a success notification
        Swal.fire({
          icon: 'success',
          title: 'Request Deleted',
          text: 'The request has been deleted successfully.',
        });
      })
      .catch((error) => {
        // Handle the error
  
        // Display an error notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the request.',
        });
  
        console.error("Failed to delete request:", error);
      });
  };

  const handleStatusChange = (userId, entityType) => {
    if (entityType === "DJ") {
      Swal.fire({
        title: "Update DJ Status",
        text: 'Are you sure you want to update the DJ status to "accepted"?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8003/updateDJStatus/${userId}`, {
              newStatus: "accepted",
            })
            .then((response) => {
              // Handle the response as needed
              Swal.fire("Updated!", "DJ status has been updated.", "success");
              fetchData(); // Fetch the updated data to refresh the component
            })
            .catch((error) => {
              // Handle the error
              Swal.fire("Error", "Failed to update DJ status", "error");
            });
        }
      });
    } else if (entityType === "Cater") {
      Swal.fire({
        title: "Update Cater Status",
        text: 'Are you sure you want to update the Cater status to "accepted"?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8002/updateCaterStatus/${userId}`, {
              newStatus: "accepted",
            })
            .then((response) => {
              // Handle the response as needed
              Swal.fire(
                "Updated!",
                "Cater status has been updated.",
                "success"
              );
              fetchData(); // Fetch the updated data to refresh the component
            })
            .catch((error) => {
              // Handle the error
              Swal.fire("Error", "Failed to update Cater status", "error");
            });
        }
      });
    } else if (entityType === "Venue") {
      Swal.fire({
        title: "Update Venue Status",
        text: 'Are you sure you want to update the Venue status to "accepted"?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8000/updateVenueStatus/${userId}`, {
              newStatus: "accepted",
            })
            .then((response) => {
              // Handle the response as needed
              Swal.fire(
                "Updated!",
                "Venue status has been updated.",
                "success"
              );
              fetchData(); // Fetch the updated data to refresh the component
            })
            .catch((error) => {
              // Handle the error
              Swal.fire("Error", "Failed to update Venue status", "error");
            });
        }
      });
    } else if (entityType === "Photographer") {
      Swal.fire({
        title: "Update Photographer Status",
        text: 'Are you sure you want to update the Photographer status to "accepted"?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://localhost:8001/updatePhotographerStatus/${userId}`, {
              newStatus: "accepted",
            })
            .then((response) => {
              // Handle the response as needed
              Swal.fire(
                "Updated!",
                "Photographer status has been updated.",
                "success"
              );
              fetchData(); // Fetch the updated data to refresh the component
            })
            .catch((error) => {
              // Handle the error
              Swal.fire(
                "Error",
                "Failed to update Photographer status",
                "error"
              );
            });
        }
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Request List</h1>
      <button
        className="btn btn-danger mb-2"
        onClick={() => {
          dispatch({ type: "logoutAdmin" });
        }}
      >
        Logout
      </button>
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
          {data1.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.entityType}</td>
              <td>{request.DJName}</td>
              <td>₹{request.DJPrice}</td>
              <td>
                <textarea rows="3" value={request.DJDescription} />
              </td>
              <td>{request.DJEmail}</td>
              <td>{request.Status}</td>
              <td>
                {request.Status === "pending" && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleAcceptDJ(request._id);
                        handleStatusChange(request._id, request.entityType);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleRejectDJ(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {data2.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.entityType}</td>
              <td>{request.CaterName}</td>
              <td>₹{request.CaterPrice}</td>
              <td>
                <textarea rows="3" value={request.CaterDescription} />
              </td>
              <td>{request.CaterEmail}</td>
              <td>{request.Status}</td>
              <td>
                {request.Status === "pending" && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleAcceptCater(request._id);
                        handleStatusChange(request._id, request.entityType);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleRejectCater(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {data3.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.entityType}</td>
              <td>{request.VenueName}</td>
              <td>₹{request.VenuePrice}</td>
              <td>
                {" "}
                <textarea rows="3" value={request.VenueDescription} />{" "}
              </td>
              <td>{request.VenueEmail}</td>
              <td>{request.Status}</td>
              <td>
                {request.Status === "pending" && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleAcceptVenue(request._id);
                        handleStatusChange(request._id, request.entityType);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleRejectVenue(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {data4.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.entityType}</td>
              <td>{request.PhotoGrapherName}</td>
              <td>₹{request.PhotoGrapherPrice}</td>
              <td>
                <textarea rows="3" value={request.PhotoGrapherDescription} />
              </td>
              <td>{request.PhotoGrapherEmail}</td>
              <td>{request.Status}</td>
              <td>
                {request.Status === "pending" && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleAcceptPhotographer(request._id);
                        handleStatusChange(request._id, request.entityType);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleRejectPhotographer(request._id)}
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
