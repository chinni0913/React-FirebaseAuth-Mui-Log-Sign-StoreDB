import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getCustomers, addCustomer, getCustomer, updateCustomer, deleteCustomer} from '../data/customerData';
import CustomerDialog from './CustomerDialog';

const Customer = () => {
    const classes  = useStyles();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] =  useState('');
    const [gender, setGender] = useState('Female');
    const [city, setCity] = useState('');
    const [postcode, setPostCode] = useState('');
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleGender = (event) => {
        setGender(event.target.value);
    }
    const handleCity = (event) => {
        setCity(event.target.value);
    }
    const handlePostCode = (event) => {
        setPostCode(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getCustomers();
            setCustomers(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneCustomer = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getCustomer(id);
                 setFirstName(response.firstname);
                 setLastName(response.lastname);
                 setPhoneNumber(response.phonenumber);
                 setGender(response.gender);
                 setCity(response.city);
                 setPostCode(response.postcode);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteCustomer(id);
                getlist();
                toast.success('Customer Deleted Successfully');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setPostCode('');
            setCity('');
            setGender('Female'); 
    }

    const addCustomerHandler = async () => {
            try {
                 const customer = {
                     firstname,
                     lastname,
                     phonenumber,
                     gender,
                     city,
                     postcode
                 }
                if (formMode) {
                    await addCustomer(customer);
                    toast.success('Customer Added Successfully');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setPostCode('');
                    setCity('');
                    setGender('Female'); 
                }else {
                    await updateCustomer(custId, customer);
                    toast.success('Customer Updated Successfully');
                    getlist();
                    setOpen(false);
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setPostCode('');
                    setCity('');
                    setGender('Female'); 
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                        Customers
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Add</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Full Name</TableCell>
                            <TableCell className={classes.head}>Phone</TableCell>
                            <TableCell className={classes.head}>Gender</TableCell>
                            <TableCell className={classes.head}>City</TableCell>
                            <TableCell className={classes.head}>Post Code</TableCell>
                            <TableCell className={classes.head}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {customers.map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell className={classes.body}>{cust.firstname} {cust.lastname} </TableCell>
                                  <TableCell className={classes.body}>{cust.phonenumber}</TableCell>
                                  <TableCell className={classes.body}>{cust.gender}</TableCell>
                                  <TableCell className={classes.body}>{cust.city}</TableCell>
                                  <TableCell className={classes.body}>{cust.postcode}</TableCell>
                                  <TableCell className={classes.body}>
                                    <IconButton onClick={() => getOneCustomer(cust.id)} color="primary" aria-label="update customer">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="delete customer">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <CustomerDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                firstname={firstname}
                lastname={lastname}
                phonenumber={phonenumber}
                postcode={postcode}
                city={city}
                gender={gender}
                changeFirstname={handleFirstName}
                changeLastname={handleLastName}
                changephonenumber={handlePhoneNumber}
                changepostcode={handlePostCode}
                changeCity={handleCity}
                changeGender={handleGender}
                addCustomer={addCustomerHandler}
            />
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: 'gray',
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
    body: {
        textAlign: 'center'
    }
}));

export default Customer;