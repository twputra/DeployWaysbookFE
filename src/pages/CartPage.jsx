import React, { useEffect } from "react";
import { useMutation } from "react-query";
import NavbarUser from "../components/Navbar";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import bin from "../assets/bin.png";

import { API } from "../config/api";
import { useQuery } from "react-query";

import { UserContext } from "../context/userContext";
import { useContext } from "react";

export default function MyCartPage() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  let { data: carts, refetch } = useQuery("cartUserCache", async () => {
    const response = await API.get("/user-cart");
    return response.data.data;
  });

  console.log("ini data carts", carts);

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/cart/${carts[0]?.id}`);
      console.log(response);
      alert("delete success");
    } catch (error) {
      alert("delete failed");
      console.log(error);
    }
  };
  let Total = 0;

  carts?.map((e) => {
    Total += e.total;
  });
  const handleSubmit = useMutation(async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const data = {
      total: Total,
    };

    const response = await API.patch("/transaction", data, config);

    refetch();

    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        navigate("/profile");
      },
      onPending: function (result) {
        navigate("/profile");
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    // const myMidtransClientKey = "SB-Mid-client-b8WeIEvd5FvVR65y";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <NavbarUser />
      <Container className="mt-5">
        <Container>
          <h3
            style={{
              fontFamily: "time new roman",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "28px",
            }}
          >
            My Cart
          </h3>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "25px",
            }}
          >
            Review Your Order
          </p>
          <Row>
            {carts?.map((items) => (
              <>
                <Col sm={8}>
                  <hr />
                  <div className="d-flex">
                    <img
                      src={items?.book?.image}
                      alt=""
                      style={{ width: "20%" }}
                    />
                    <div className="ms-2  d-flex justify-content-between w-100">
                      <div>
                        <p
                          style={{
                            fontFamily: "times new roman",
                            fontWeight: "700",
                            fontSize: "18px",
                          }}
                        >
                          {items?.book?.title}
                        </p>
                        <p
                          style={{
                            fontStyle: "italic",
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#929292",
                          }}
                        >
                          By. {items?.book?.author}{" "}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "800",
                            color: "#44B200",
                            lineHeight: "19px",
                          }}
                        >
                          Rp {items?.total}
                        </p>
                      </div>
                      <div>
                        <Badge
                          onClick={handleDelete}
                          className="pointer"
                          pill
                          bg="light"
                        >
                          <img src={bin} alt="" />
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
            <Col md={4}>
              <hr />
              <Col>
                Subtotal :{formatIDR.format(Total)}
                <br />
                Qty :{carts?.length}
                <br />
                <hr />
                <p className="text-green fw-bold">
                  Total :{formatIDR.format(Total)}
                </p>
                <Button
                  variant="dark"
                  className="float-end w-75"
                  onClick={() => handleSubmit.mutate()}
                >
                  Pay
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
