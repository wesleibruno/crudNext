import Users from "../../../src/components/user";
import { User } from "../../../types/User";

type Props = {
  users: User[];
};
function UserList({ users }: Props) {
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <Users user={user} />
          <hr />
        </div>
      ))}
    </>
  );
}
export default UserList;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
}
