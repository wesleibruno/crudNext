import { User } from "../../../types/User";

type Props = {
  user: User[];
};
function User({ user }: Props) {
  return (
    <>
      <h2>{/* {user} */}</h2>
    </>
  );
}

export default User;

export async function getStaticProps(context: any) {
  const { params } = context;
  // const { id } = params;
  // const res = await fetch(`http://localhost:3000/api/users/${id}`);
  // const data = await res.json();
  // return {
  //   props: {
  //     user: data,
  //   },
  // };
}
