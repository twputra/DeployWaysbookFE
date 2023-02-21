import React from "react";
import { API } from "../config/api";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import NavbarUser from "../components/Navbar";
export default function DetailBookPage() {
  let { id } = useParams();

  let { data: detailBook } = useQuery("detailBookCache", async () => {
    const response = await API.get("/book/" + id);
    return response.data.data;
  });

  const handleSubmit = useMutation(async (data) => {
    try {
      const form = {
        book_id: data.book_id,
      };

      const response = await API.post("/cart", JSON.stringify(form));

      console.log("yang dikirim: ", form);
      alert("sukses");
    } catch (error) {
      alert("error");
    }
  });

  console.log("ini detail", detailBook);

  return (
    <>
      <NavbarUser />
      <Container className="mt-5">
        <Row>
          <Col className="text-center d-flex justify-content-center" sm>
            <div
              style={{
                width: "20rem",
              }}
            >
              <img
                style={{ width: "100%" }}
                src={detailBook?.image}
                alt=""
              ></img>
            </div>
          </Col>
          <Col className="" sm>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                fontSize: "40px",
              }}
            >
              {detailBook?.title}
            </p>
            <p>By. {detailBook?.author}</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              Publication date
            </p>
            <p>{detailBook?.date}</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>pages</p>
            <p>434</p>
            <p style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}>
              ISBN
            </p>
            <p>{detailBook?.isbn}</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>price</p>
            <p>{detailBook?.price}</p>
          </Col>
        </Row>
        <section className="d-flex justify-content-center">
          <div className="" style={{ width: "80%" }}>
            <h3 className="mt-5">ABOUT THIS BOOK</h3>
            <p style={{ textAlign: "justify" }}>{detailBook?.description}</p>
            <div className=" d-flex justify-content-center mb-5">
              <button
                onClick={() =>
                  handleSubmit.mutate({
                    book_id: detailBook?.id,
                  })
                }
                className="mt-3 py-2 bg-dark text-light ms-auto"
                style={{ width: "11%", border: "0" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
