import { User } from "../../../types/User";
type Props = {
  user: User;
  name?: string;
  email?: string;
};
function Users({ user }: Props) {
  return (
    <>
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
    </>
  );
}

export default Users;
