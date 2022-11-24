import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type IdUser = {
  idUser: string;
};

const Edit = (idUser: IdUser) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const { idUser } = useParams();

  useEffect(() => {
    const getDepart = async () => {
      const { data: res } = await axios.get(
        "http://localhost:3000/api/departments"
      );
      setDepartment(res);
    };
    getDepart();
  }, []);

  // useEffect(() => {
  //   getUsers();
  // }, []);
  console.log("idUser", idUser);
  useEffect(() => {
    console.log("idUser2", idUser);
    if (idUser) {
      getUserById(idUser);
    }
  }, [idUser]);

  const getUserById = (idUser: any) => {
    fetch(`http://localhost:3000/api/users/${idUser.idUser}`)
      .then((response) => response.json())
      .then((response) => setUser(response));
    // setName(response.data.name);
    // setEmail(response.data.email);
  };

  // const updateUsers = async (idUser:any) => {
  //   await axios.patch(`http://localhost:3000/api/users/${idUser}`, {
  //     name: name,
  //     email: name,
  //     // departmentId: departmentId,
  //   });
  //   router.push("/users");
  // };

  const handleSaveForm = async () => {
    if (name && email && department) {
      const { data: res } = await axios.patch(
        `http://localhost:3000/api/users`,
        {
          name: name,
          email: name,
          departmentId: departments,
        }
      );
      const json = await res.json();
      if (json.status) {
        router.push("/users");
      }
      // console.log(res);
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <div>
        <form method="post">
          <label>Name</label>
          <input
            type="text"
            value={user && user?.name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter name"
          />
          <label>Email</label>
          <input
            type="email"
            value={user && user?.email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />

          <br />

          <select
            className="form-control"
            multiple={false}
            value={departments}
            onChange={(e: any) => setDepartments(e.target.value)}
          >
            <option value="">Selecionar</option>;
            {department.map((item: any, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <Link href={"/users"}>
            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Cancelar
            </button>
          </Link>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSaveForm}
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
