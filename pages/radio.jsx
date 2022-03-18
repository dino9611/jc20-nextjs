import { Container } from "./../components";
import { useState } from "react";

const Radioku = () => {
  const [radios, setradios] = useState(["bakso", "mie ayam", "nasi padang"]);
  const [pilihan, setpilihan] = useState("");
  const [checkbox, setcheckbox] = useState([]);

  const renderRadios = () => {
    return radios.map((val) => {
      return (
        <div key={val}>
          <input
            type={"radio"}
            className="text-red-800 focus:ring-0 mr-2"
            onClick={() => setpilihan(val)}
            name="food"
            checked={val === pilihan}
          />
          {val}
        </div>
      );
    });
  };

  const renderCheckbox = () => {
    return radios.map((val) => {
      return (
        <div key={val}>
          <input
            type={"checkbox"}
            className="text-red-800 focus:ring-0 mr-2"
            onClick={() => {
              if (checkbox.includes(val)) {
                // find index
                let index = checkbox.indexOf(val);
                let newCheckbox = checkbox;
                // hapus
                newCheckbox.splice(index, 1);
                setcheckbox([...newCheckbox]);
                // biar berhenti kasih return
                return;
              }
              setcheckbox([...checkbox, val]);
            }}
            name="food"
            checked={checkbox.includes(val)}
          />
          {val}
        </div>
      );
    });
  };
  return (
    <Container>
      <div>
        <h1>Radioku</h1>
        <div>{renderRadios()}</div>
        <div>{renderCheckbox()}</div>
        <div
          className="mt-4 text-white cursor-pointer hover:bg-red-900 bg-red-700 p-3 w-1/12 rounded-lg"
          onClick={() => {
            console.log(pilihan);
            console.log(checkbox);
          }}
        >
          Pencet
        </div>
      </div>
    </Container>
  );
};

export default Radioku;
