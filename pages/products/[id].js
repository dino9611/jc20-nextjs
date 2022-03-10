import axios from "axios";
import jsCookie from "js-cookie";

const Products = (props) => {
  return <div>{props.data.name}</div>;
};

export async function getServerSideProps({ params, ...rest }) {
  console.log(rest.req.headers.cookie);
  let res1 = await axios.get(`http://localhost:5000/products/${params.id}`);
  return {
    props: {
      data: res1.data,
    },
  };
}

export default Products;
