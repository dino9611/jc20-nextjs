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
// export const getStaticProps = async () => {

// };

export default function Home(props) {
  const [data, setdata] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [input, setinput] = useState({
    name: "",
    price: "",
  });

  const nameref = useRef(null);

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
    fetchData();
  }, []);

  const handleInput = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const renderData = () => {
    return data.map((val) => {
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
              <button className="bg-matoa-text-primary mr-2 w-[70px] p-2 rounded-md text-white">
                Delete
              </button>
              <button className="bg-matoa-text-primary w-[70px] p-2 rounded-md text-white">
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Container>
      <Dialog open={isOpen} onClose={() => setisOpen(false)}>
        <DialogTitle>ADD data Product</DialogTitle>
        <DialogContent>
          <input
            onChange={handleInput}
            ref={nameref}
            value={input.name}
            type="text"
            className="my-1 w-full focus:ring-matoa-text-primary focus:border-matoa-text-primary"
            name="name"
            placeholder="name"
          />
          <input
            onChange={handleInput}
            value={input.price}
            type="number"
            className="my-1 w-full focus:ring-matoa-text-primary focus:border-matoa-text-primary"
            name="price"
            placeholder="price"
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setisOpen(false)}
            className="bg-matoa-text-primary min-w-[80px] p-2 rounded-md text-white"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <div>
        <button
          onClick={() => {
            // console.log(nameref.current);
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
