import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import { event } from "../lib/gtag";
import { useEffect, useRef, useState } from "react";
import { Container } from "./../components";
import { AxiosInstance } from "../helpers";
import {
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Swal from "sweetalert2";
// export const getStaticProps = async () => {

// };
// [
//   {postingan_id:12,postingan:'',userposting:'',userpostingphoto:'',imageposting:'',likes:200,comment_total:100,likebyuser:true}
// ]

export default function Home(props) {
  const [data, setdata] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenEdit, setisOpenEdit] = useState(false);
  const [indexEdit, setindexEdit] = useState(-1);
  const [input, setinput] = useState({
    name: "",
    price: "",
  });
  const [inputEdit, setinputEdit] = useState({
    name: "",
    price: "",
  });

  const nameref = useRef(null);
  const priceref = useRef(null);
  const priceEditref = useRef(null);

  const fetchData = async () => {
    try {
      let res = await AxiosInstance.get("/product");
      console.log(res.data);
      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(nameref.current);
  }, [nameref]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const handleInputEdit = (e) => {
    setinputEdit({ ...inputEdit, [e.target.name]: e.target.value });
  };

  const addDataHandler = async () => {
    try {
      let res = await AxiosInstance.post("/product", input);
      setdata(res.data);
      setinput({
        name: "",
        price: "",
      });
      setisOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyUp = (e, tesref) => {
    console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.name === "price") {
      console.log("masuk sini");
      addDataHandler();
    } else if (e.keyCode === 13) {
      tesref.current.focus();
    }
  };

  const handleKeyUpEdit = (e, tesref) => {
    console.log(e.keyCode);
    if (e.keyCode === 13 && e.target.name === "price") {
      console.log("masuk sini");
      onSaveEditCLick();
      // function edit yang ada axios
    } else if (e.keyCode === 13) {
      tesref.current.focus();
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure want to delete ${data[index].name} ?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        let res = await AxiosInstance.delete("/product/" + id);
        setdata(res.data);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditCLick = (index) => {
    setindexEdit(index);
    setisOpenEdit(true);
    setinputEdit(data[index]);
  };

  const onSaveEditCLick = () => {
    // disini axios
    console.log(inputEdit);
  };

  const renderData = () => {
    return data.map((val, index) => {
      return (
        <div
          className="bg-white text-matoa-text rounded-md my-4 p-3 shadow-md w-1/2"
          key={val.id}
        >
          <div className="text-xl capitalize font-semibold my-2">
            {val.name}
          </div>
          <Divider />
          <div className="mt-2 ">
            <div className="text-md text-lg">{val.price}</div>
            <div className="float-right">
              <button
                onClick={() => handleDelete(val.id, index)}
                className="bg-matoa-text-primary mr-2 w-[70px] p-2 rounded-md text-white"
              >
                Delete
              </button>
              <button
                onClick={() => onEditCLick(index)}
                className="bg-matoa-text-primary w-[70px] p-2 rounded-md text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderForm = (inputpar, handleInputpar, handleKeyUppar, refpar) => {
    return (
      <>
        <input
          onChange={handleInputpar}
          // ref={nameref}
          onKeyUp={(e) => handleKeyUppar(e, refpar)}
          // onFocus={() => console.log("focus")}
          // onBlur={() => console.log("blur")}
          autoFocus
          value={inputpar.name}
          type="text"
          className="my-1 w-full focus:ring-matoa-text-primary focus:border-matoa-text-primary"
          name="name"
          placeholder="name"
        />
        <input
          onChange={handleInputpar}
          onKeyUp={(e) => handleKeyUppar(e, null)}
          ref={refpar}
          value={inputpar.price}
          type="number"
          className="my-1 w-full focus:ring-matoa-text-primary focus:border-matoa-text-primary"
          name="price"
          placeholder="price"
        />
      </>
    );
  };

  return (
    <Container>
      <Dialog open={isOpen} onClose={() => setisOpen(false)}>
        <DialogTitle>ADD data Product</DialogTitle>
        <DialogContent>
          {renderForm(input, handleInput, handleKeyUp, priceref)}
        </DialogContent>
        <DialogActions>
          <button
            onClick={addDataHandler}
            className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
          >
            Save
          </button>
          <button
            onClick={() => setisOpen(false)}
            className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <Dialog open={isOpenEdit} onClose={() => setisOpenEdit(false)}>
        <DialogTitle>edit data {data[indexEdit]?.name}</DialogTitle>
        <DialogContent>
          {renderForm(
            inputEdit,
            handleInputEdit,
            handleKeyUpEdit,
            priceEditref
          )}
        </DialogContent>
        <DialogActions>
          <button
            onClick={onSaveEditCLick}
            className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
          >
            Save
          </button>
          <button
            onClick={() => setisOpenEdit(false)}
            className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <div>
        <button
          onClick={() => {
            // nameref.current.focus();
            setisOpen(true);
            // nameref.current.focus();
          }}
          className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
        >
          Add data
        </button>
      </div>
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        {renderData()}
      </div>
    </Container>
  );
}
