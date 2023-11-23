// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
// import axios from 'axios'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useSearchParams } from "react-router-dom"

// const PaymentSucess = () => {
//     const {userID} = useSelector(state => state.root);
//     axios.post("http://localhost:8006/deletepaysuccess",{userID})
//     .then(result => console.log(result))
//     .catch(error => console.log(error))
//     const searchQuery = useSearchParams()[0]
//     const referenceNum = searchQuery.get("reference")
//     return (
//         <Box>
//             <VStack h="100vh" justifyContent={"center"}>

//                 <Heading textTransform={"uppercase"}> Order Successfull</Heading>

//                 <Text>
//                     Reference No.{referenceNum}
//                 </Text>

//             </VStack>
//         </Box>
//     )
// }

// export default PaymentSucess

import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';


const PaymentSuccess = () => {
  const { userID } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get('reference');

  useEffect(() => {
    const deletePaymentSuccess = async () => {
      try {
        const result = await axios.post('http://localhost:8006/deletepaysuccess', { userID });
        console.log(result.data); // Log the server response
      } catch (error) {
        console.error('Error deleting payment success:', error);
      }
    //   dispatch({type:'removeUserID'})
    };

    deletePaymentSuccess();
  }, [userID]); // Trigger the effect when userID changes

  return (
    <Box>
      <VStack h="100vh" justifyContent="center">
        <Heading textTransform="uppercase">Order Successful</Heading>
        <Text>Reference No. {referenceNum}</Text>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
