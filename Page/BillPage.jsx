import React from 'react'
import Bill from '../Components/Bill'
import { Button } from 'antd'
import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
const BillPage = () => {
    const targetRef = useRef();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-8">

<Bill a = {targetRef}/>
<Button type='primary' onClick={() => generatePDF(targetRef, {filename: 'bill.pdf'})} className='mx-auto'>Print Bill</Button>
    </div>
)
}

export default BillPage