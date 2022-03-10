import axios from "axios";

const Products = (props) => {
  return <div>{props.data.name}</div>;
};

export async function getServerSideProps({ params }) {
  let res = await axios.get(`http://localhost:5000/products/${params.id}`);
  return {
    props: {
      data: res.data,
    },
  };
}

export default Products;
