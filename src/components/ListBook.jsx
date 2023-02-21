import React, { useContext, useState } from "react";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
// Import Swiper React components
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
export default function ListBook() {
  const [state] = useContext(UserContext);
  const [search, setSearch] = useState("")

  let { data: listBook } = useQuery("listBookCache", async () => {
    const response = await API.get("/books-regular");
    return response.data.data;
  });

  console.log("ini data list book", listBook);

  const navigate = useNavigate();
  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  return (
    <Container>
      <Col md={12} className="text-end d-flex justify-content-center">
        <Col md={6}>
          <InputGroup className="mb-3 mt-2 shadow-2 fw-bold">
            <Form.Control
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search Your Books Here ..."
            />
          </InputGroup>
        </Col>
      </Col>

      <h1 className=" fs-36 fw-bold mb-3">Book Lists</h1>
      <Row className=" d-flex justify-content-start mx-auto mb-5">

        {listBook?.filter((value) => {if (search === ""){ 
          return value
        } else if (value.title.toLowerCase().includes(search.toLocaleLowerCase())) {
          return value 
        } else if (value.description.toLocaleLowerCase().includes(search.toLowerCase())) {
          return value
        } }).map((item) => ( 
          <Col
            style={{ width: "12rem" }}
            className="text-start col-12 col-md-6 col-lg-3 text-center me-3 mb-3"
            onClick={
              state.isLogin
                ? () => navigate(`/detail/${item?.id}`)
                : () => setModalLogin(true)
            }
          >
            <section>
              <img
                className="mb-3 w-full"
                src={item?.image}
                alt="book"
                style={{ height: "255px", objectFit: "cover" }}
              />
              <div className="w-full">
                <h4 className=" fw-bold text-start mb-1">{item?.title}</h4>
                <p
                  className="text-start  fs-14 text-grey mb-1"
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    fontWeight: "400",
                    color: "#929292",
                  }}
                >
                  By {item?.author}
                </p>
                <p
                  className="fs-18 text-start fw-bold"
                  style={{
                    color: "green",
                    fontSize: "18px",
                    fontWeight: "800",
                    lineHeight: "25px",
                  }}
                >
                  {formatIDR.format(item?.price)}
                </p>
              </div>
            </section>
          </Col>
        ))}
      </Row>

      <Login
        modalLogin={modalLogin}
        setModalLogin={setModalLogin}
        switchRegister={setModalRegister}
      />
      <Register
        modalRegister={modalRegister}
        setModalRegister={setModalRegister}
        switchLogin={setModalLogin}
      />
    </Container>
  );
}
