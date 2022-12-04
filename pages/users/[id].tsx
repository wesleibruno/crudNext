import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";
import React from "react";
import { User } from "../../types/User";

var url = process.env.URL;

const Edit = ({ user }: { user: User }) => {
  const router = useRouter();
  const userId = router.query.id;
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState(user.email);
  const [departmentInput, setDepartmentInput] = useState([]);
  const [departments, setDepartments] = useState();

  useEffect(() => {
    getDepart();
    getUsers();
  }, []);

  const getDepart = async () => {
    const { data: res } = await axios.get(
      "http://localhost:3000/api/departments"
    );
    setDepartmentInput(res);
  };

  const getUsers = async () => {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
    const data = await res.json();

    if (data.status === 404) {
      router.push("/users");
    } else {
      setNameInput(data.name);
      setEmailInput(data.email);
      setDepartments(data.departmentId);
    }
  };

  const handleSaveForm = async () => {
    if (nameInput && emailInput && departmentInput) {
      const { data: res } = await axios.patch(
        `http://localhost:3000/api/users/${userId}`,
        {
          name: nameInput,
          email: emailInput,
          departmentId: departments,
        }
      );
      // const json = await res.json();
      // if (json.status) {
      router.push("/users");
      // }
      // console.log(res);
    } else {
      alert("Preencha os campos");
    }
  };

  // const handleSaveForm = async () => {
  //   if (nameInput && emailInput && departmentInput) {
  //   const req = await fetch(`http://localhost:3000/api/users/${userId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: nameInput,
  //       email: emailInput,
  //       departmentId: departments,
  //     }),
  //   }).catch((err) => {
  //     if(err) {
  //       console.log(err);
  //       alert("Error: " + err.message);
  //     }
  //   });
  //   // const json = await req.json();
  //   // if (json.status === 200) {
  //     router.push("/users");
  //   }
  // };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <div>
        <form method="post">
          <label>Name</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="form-control"
            placeholder="Enter name"
          />
          <label>Email</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="form-control"
            placeholder="Enter email"
          />

          <br />

          <select
            className="form-control"
            multiple={false}
            onChange={(e: any) => setDepartments(e.target.value as any)}
            value={departments}
          >
            <option> Selecione um Departamento </option>
            {departmentInput.map((item: any, index: Key | null) => {
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
          <Link href={`/users/${userId}`}>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSaveForm}
            >
              Salvar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${url}/api/users`);
  const data = await res.json();
  const paths = data.map((user: User) => {
    return {
      params: {
        id: user.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const res = await fetch(`${url}/api/users/${params.id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}

export default Edit;
