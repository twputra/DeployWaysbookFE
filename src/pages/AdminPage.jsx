// import Container from "react-bootstrap/esm/Container";
// import Table from "react-bootstrap/Table";
// import NavbarUser from "../components/Navbar";
// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { API } from "../config/api";
import NavbarAdmin from '../components/NavbarAdmin'
import AdminTable from '../components/AdminTable'
import DataBook from '../components/DataBook'

export default function  AdminPage() {

  // let { data: transactions } = useQuery("transactionssCache", async () => {
  //   const response = await API.get("/transactions");

  //   return response.data.data;
  // });
  // console.log("ini trans", transactions);
  // const formatIDR = new Intl.NumberFormat(undefined, {
  //   style: "currency",
  //   currency: "IDR",
  //   maximumFractionDigits: 0,
  // });

  // console.log(transactions);

  return (
    <>
      <NavbarAdmin />
      <AdminTable />
      <DataBook />
      


      {/* <Container style={{ marginTop: "200px" }}>
        <h1>Incoming Transaction</h1>
        <Table className="" striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Product Purchased</th>
              {/* <th>Bukti Transfer</th> */}
              {/* <th>Total Payment</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((value, index) => {
              return (
                <tr>
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{value?.user?.fullname}</td>
                  <td className="py-3">{value?.cart?.map((a) => {
                                        return <span>{a?.book?.title} </span>
                                    })}</td>
                  {/* <td className="py-3">{value.check_in}</td> */}
                  {/* <td className="py-3">{formatIDR.format(value?.total)}</td>
                  <td
                    className={
                      value.status === "success"
                        ? "text-success"
                        : value.status_payment === "Pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {value.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container> */} 

    </>
  )
}

