import { User } from "../../types/User";

type Props = {
  users: User[];
};

const User = ({ users }: Props) => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <h3>{user.Department.name}</h3>
          <hr />
        </div>
      ))}
    </>
  );
};

export default User;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/users/");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}
