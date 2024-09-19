import React, { useEffect } from 'react'
import Bill from '../Components/Bill'
import NavBar from '../Components/NavBar'
import { Button } from 'antd'
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getBillById } from '../Store/Action/UserAction';
const BillPage = () => {
    const targetRef = useRef();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {billData} = useSelector((state)=>state.User);
    useEffect(() => {
      dispatch(getBillById(id));
    }, [])
    
  return (
   <>
   <NavBar/>
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8">

<Bill data={billData} a = {targetRef}/>
<Button type='primary' onClick={() => generatePDF(targetRef, {filename: 'bill.pdf'})} className='mx-auto'>Print Bill</Button>
    </div>
   </>
)
}

export default BillPage