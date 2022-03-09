const Products = (props) => {
  return <div>{props.id}</div>;
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default Products;
