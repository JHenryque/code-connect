import style from "./error.module.css";
import banner from "../assets/404.png";
import Link from "next/link";

export default function NotFound() {
  <div className={style.container}>
    <Image src={banner} />
    <Heading>Opa! Ocorreu um erro.</Heading>
    <p className={style.text}>
      Não conseguimos carregar a página, volte para seguir navegando.
    </p>
    <Link href="/">
      Voltar ao feed <ArrowBack color="#81FE88" />
    </Link>
  </div>;
}
