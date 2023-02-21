import React from 'react'
import { Row, Col, Button, Container, Modal, Form } from 'react-bootstrap'
import NavbarUser from '../components/Navbar'
import { useMutation } from 'react-query'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import PurchasedBooks from '../components/PurchasedBooks'

import phone from '../assets/phone.png'
import gender from '../assets/gender.png'
import email from '../assets/email.png'
import map from '../assets/map.png'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

export default function ProfilePage() {
    const { data: user, refetch } = useQuery("profileCache", async () => {
        const response = await API.get("/user")

        return response.data.data
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState()

    useEffect(() => {
        setPreview(user?.image)
        setForm({
            fullname: user?.fullname,
            address: user?.address,
            phone: user?.phone,
            image: user?.image,
            gender: user?.gender,
        })
    }, [user])

    const [form, setForm] = useState({
        fullname: "",
        password: "",
        phone: 0,
        address: "",
        image: "",
        gender: "",
    })



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            console.log("blob image", url);
          }
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }

            const formData = new FormData()
            formData.set("fullname", form.fullname)
            formData.set("password", form.password)
            if (form?.image !== undefined) {
                formData.set("image", form?.image[0])
            }
            formData.set("address", form.address)
            formData.set("phone", form.phone)
            formData.set("gender", form.gender)

            await API.patch("/user-update", formData, config)
            // refetch()



            setShow(false)
            alert("sukses update")
        } catch (error) {
            console.log(error)
            alert("error")
        }
    })




    const [state,] = useContext(UserContext)

    console.log("ini state", state);

    return (
        <>
            <NavbarUser />
            <Container className='py-4 rounded mt-5' style={{ backgroundColor: "pink", width: "60%" }}>
                <Row>
                    <Col sm={8}>
                        <div className='mb-3 d-flex'>
                            <div className='d-flex align-items-center me-3' >
                                <img src={email} alt='' />
                            </div>
                            <div>
                                <span className='d-block fw-bold' style={{ fontSize: "14px" }} >{user?.email}</span>
                                <span className='text-muted' style={{ fontSize: "12px" }}>Email</span>
                            </div>
                        </div>
                        <div className='mb-3 d-flex'>
                            <div className='d-flex align-items-center me-3' >
                                <img src={gender} alt='' />
                            </div>
                            <div>
                                <span className='d-block fw-bold' style={{ fontSize: "14px" }} >{user?.gender}</span>
                                <span className='text-muted' style={{ fontSize: "12px" }}>Gender</span>
                            </div>
                        </div>
                        <div className='mb-3 d-flex'>
                            <div className='d-flex align-items-center me-3' >
                                <img src={phone} alt='' />
                            </div>
                            <div>
                                <span className='d-block fw-bold' style={{ fontSize: "14px" }} >{user?.phone}</span>
                                <span className='text-muted' style={{ fontSize: "12px" }}>Phone</span>
                            </div>
                        </div>
                        <div className='mb-3 d-flex'>
                            <div className='d-flex align-items-center me-3' >
                                <img src={map} alt='' />
                            </div>
                            <div>
                                <span className='d-block fw-bold' style={{ fontSize: "14px" }} >{user?.address}</span>
                                <span className='text-muted' style={{ fontSize: "12px" }}>Addres</span>
                            </div>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className='d-flex justify-content-center mb-4'>
                            <img src={user?.image} alt={phone} style={{ width: "60%" }} />
                        </div>
                        <div className='d-flex justify-content-center '>
                            <Button onClick={handleShow} variant="danger" className='px-5' >Edit Profile</Button>
                        </div>

                    </Col>
                </Row>
            </Container>
            <PurchasedBooks />

            {/* <Modal size="md" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="py-3" onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3">
                            <div className="border border-danger rounded border-opacity-25">
                                <Form.Control
                                    name="fullname"
                                    type="text"
                                    placeholder="Fullname"
                                    value={form.fullname}
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="border border-danger rounded border-opacity-25">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className=" rounded border-opacity-25">
                                <img
                                    src={preview}
                                    style={{
                                        maxWidth: "150px",
                                        maxHeight: "150px",
                                        objectFit: "cover",
                                        marginBottom: "15px",
                                        borderRadius: "10px",
                                    }}
                                    alt={preview}
                                />
                                <Form.Control
                                    type="file"
                                    name="image"
                                    id="addProductImage"
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="border border-danger rounded border-opacity-25">
                                <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="border border-dark rounded border-opacity-25">
                                <Form.Control
                                    type="text"
                                    placeholder="Gender"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="border border-danger rounded border-opacity-25">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Address"
                                    value={form.address}
                                    name="address"
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                        resize: "none",
                                    }}
                                />
                            </div>
                        </Form.Group>

                        <div className="d-grid gap-2 my-4">
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>


            </Modal> */}

            <Modal size="md" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)} >

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control onChange={handleChange} name="fullname" type="text" value={form.fullname} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={form.address}
                                name="address"
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleChange} name="email" type="email" defaultValue={state.user.email} />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control onChange={handleChange} name="gender" type="text" value={form.gender} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} name="password" type="password" value={form.password} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password"
                                onChange={handleChange} type="password" />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="">
                            <div className=" rounded border-opacity-25">
                                <img
                                    src={preview}
                                    style={{
                                        maxWidth: "150px",
                                        maxHeight: "150px",
                                        objectFit: "cover",
                                        marginBottom: "15px",
                                        borderRadius: "10px",
                                    }}
                                    alt={preview}
                                />
                                <Form.Control
                                    type="file"
                                    name="image"
                                    id="addProductImage"
                                    onChange={handleChange}
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "3px",
                                        backgroundColor: "#FFF3F7",
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button type='submit' className="w-75 mx-2 text-center fw-bold text-white " variant="warning" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>


            </Modal>
            {/* 
             */}

        </>
    )
}
