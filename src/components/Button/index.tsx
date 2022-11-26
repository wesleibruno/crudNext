import Link from "next/link";
import style from "./style.module.css";

const Button = () => {
  return (
    <Link href={"/users"}>
      <button className={`${style.teste2} ${style.teste}`}>Button</button>
    </Link>
  );
};

export default Button;
