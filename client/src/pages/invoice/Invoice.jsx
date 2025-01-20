import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../assets/images/6 Logo Verde.png';
import { PDFDocument, rgb } from 'pdf-lib';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../../components/navbar/Navbar';

const Invoice = () => {
    const [invoiceData, setInvoiceData] = useState([]);



    const {authUser} = useContext(AuthContext)
    const contentRef = useRef();
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`/api/donate/invoice/${id}`)
        .then(res=>{
            setInvoiceData(res.data)
        })
    },[id])
    console.log(invoiceData);

    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 550]); // A4 size in points

        const { width, height } = page.getSize();
        const content = contentRef.current;

        // Add logo
        const logoImageBytes = await fetch(logo).then(res => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logoImage.scale(0.5);
        page.drawImage(logoImage, {
            x: width - logoDims.width - 0,
            y: height - logoDims.height - -100,
            width: 45,
            height: 45,
        });

        // Add text content dynamically
        page.drawText('Invoice', {
            x: 50,
            y: height - 50,
            size: 30,
            color: rgb(0, 0, 0),
        });

        page.drawText(authUser?.email, {
            x: 270,
            y: height - 45,
            size: 20,
            color: rgb(0.29, 0.33, 0.4),
        });

        page.drawText(`Transaction ID:`, {
            x: 50,
            y: height - 150,
            size: 12,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont('Helvetica-Bold'),
        });

        page.drawText(`${invoiceData.paymentId}`, {
            x: 140,
            y: height - 150,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Date: ${invoiceData.createdAt ? format(new Date(invoiceData.createdAt), 'dd-MM-yyyy') : ''}`, {
            x: 50,
            y: height - 170,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText('Billing To', {
            x: 50,
            y: height - 210,
            size: 12,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont('Helvetica-Bold'),
        });

        page.drawText(`Name: ${authUser?.firstName} ${authUser?.lastName}`, {
            x: 50,
            y: height - 230,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Email: ${authUser?.email}`, {
            x: 50,
            y: height - 250,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText(`USD $ ${invoiceData.amount} Donate on ${invoiceData.date}`, {
            x: 50,
            y: height - 290,
            size: 16,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont('Helvetica-Bold'),
        });

        page.drawText('Description', {
            x: 50,
            y: height - 330,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText('Amount', {
            x: width - 100,
            y: height - 330,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Draw horizontal line
        page.drawLine({
            start: { x: 50, y: height - 340 },
            end: { x: width - 50, y: height - 340 },
            thickness: 2,
            color: rgb(0, 0, 0),
        });

        page.drawText('Subtotal', {
            x: width - 210,
            y: height - 360,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawText(`$ ${invoiceData.amount}`, {
            x: width - 90,
            y: height - 360,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Draw another horizontal line
        page.drawLine({
            start: { x: 320, y: height - 370 },
            end: { x: width - 50, y: height - 370 },
            thickness: 1,
            color: rgb(0, 0, 0),
        });

        page.drawText('Total Amount', {
            x: width - 210,
            y: height - 390,
            size: 12,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont('Helvetica-Bold'),
        });

        page.drawText(`$ ${invoiceData.amount}`, {
            x: width - 90,
            y: height - 390,
            size: 12,
            color: rgb(0, 0, 0),
        });

        page.drawLine({
            start: { x: 320, y: height - 400 },
            end: { x: width - 50, y: height - 400 },
            thickness: 1,
            color: rgb(0, 0, 0),
        });

        page.drawText("Thank you for your Donation", {
            x: 50,
            y: height - 470,
            size: 14,
            color: rgb(0, 0, 0),
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Trigger the download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Invoice.pdf';
        link.click();
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setInvoiceData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    return (
        <div>
            <Navbar></Navbar>
            <div ref={contentRef} className='invoice max-w-sm mt-4 px-6 md:max-w-3xl md:px-8 lg:max-w-3xl mx-auto lg:mt-12 shadow-xl'>
                <div className='p-6 bg-[#ffff]'>
                    <div className='grid justify-between md:grid-cols-2 items-center'>
                        <div>
                            <h1 className='font-bold text-3xl'>Invoice</h1>
                        </div>
                        <p className='font-bold text-xl md:text-2xl text-[#4a5568]'>{authUser?.email}</p>
                    </div>
                    <div className='mt-6'>
                        <p><span className='font-semibold'>Transaction ID:</span>{invoiceData.paymentId} </p>
                        <p><span className='font-semibold'>Date:</span> {invoiceData.createdAt ? format(new Date(invoiceData.createdAt), 'dd-MM-yyyy') : ''}  </p>
                    </div>
                    <div className='mt-10'>
                        <p className='font-semibold'>Billing To</p>
                        <p><span>Name: </span>{authUser?.firstName} {authUser?.lastName} </p>
                        <p><span>Email: </span>{authUser?.email} </p>
                    </div>
                    <div className='mt-4'>
                        <p className='font-bold text-xl'>USD ${invoiceData.amount} Donate on {invoiceData.createdAt ? format(new Date(invoiceData.createdAt), 'dd-MM-yyyy') : ''}</p>
                    </div>
                    <div className='mt-10 grid justify-between grid-cols-2'>
                        <div>
                            <p>Description</p>
                        </div>
                        <div className='place-self-end'>
                            <p>Amount</p>
                        </div>
                        <hr className='border-2 col-span-2 mt-2' />
                    </div>
                    <div className='grid grid-cols-2 mt-2'>
                        <div></div>
                        <div>
                            <div className='grid grid-cols-2'>
                                <p>Subtotal</p>
                                <p className='place-self-end'>${invoiceData.amount}</p>
                                <hr className='col-span-2 mt-2' />
                            </div>
                            <div className='grid grid-cols-2 my-2'>
                                <p className='font-bold'>Total Amount</p>
                                <p className='place-self-end'>${invoiceData.amount}</p>
                                <hr className='col-span-2 mt-2' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className='w-16' src={logo}alt="Logo" />
                        <p className='pt-2 font-bold'>Thank you for your Donation</p>
                    </div>
                </div>
            </div>
            <div className='text-center py-6'>
                <button onClick={generatePdf} className="btn bg-[#28a745] text-[#ffff]">Download Invoice</button>
            </div>
        </div>
    );
};

export default Invoice;

