import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { paginate } from "../../libs/paginate";
import Pagination from "../../src/components/Pagination";
import api from "../../libs/api";
import { User } from "../../types/User";

type Props = {
  usersTeste: User[];
};

const Home = ({ usersTeste }: Props) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;

  useEffect(() => {
    getUsers();
  }, []);

  // setUsers(usersTeste.map((user:User) => (
  //   {user.length}
  // );

  const getUsers = async () => {
    const { data: res } = await axios.get("http://localhost:3000/api/users");
    setUsers(res);
    // console.log(res);
  };

  //deleUser api
  function handleDeleteUser(id: string) {
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        axios.patch(`http://localhost:3000/api/users/${id}`);
        setUsers(users.filter((user: User) => user.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginateUsers = paginate(users, currentPage, pageSize);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Users</h1>
        </div>
        <div>
          <Link href={"/users/new"}>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Add
            </button>
          </Link>
        </div>
      </div>
      {/* {usersTeste.map((user: User) => (
        <div key={user.id} className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user.email}
                </h6>
                <p className="card-text">{user.Department.name}</p>
                <Link href={`/users/${encodeURIComponent(user.id)}`}>
                  <button className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Edit
                  </button>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      ))} */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateUsers.map((user: User, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.Department.name}</td>
              <td>
                <Link href={`users/${user.id}`}>
                  <button
                    onClick={() => {
                      setUserId(user.id);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                </Link>
                <Link href={"/users"}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </Link>
              </td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        items={users.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  const usersTeste = await api.getAllUsers(0);

  return {
    props: {
      usersTeste,
    },
  };
};
export default Home;
