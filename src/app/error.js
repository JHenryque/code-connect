"use client"; // Error components must be Client Components

import style from "./error.module.css";

import banner from "../assets/500.png";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowBack } from "@/components/icons/ArrowBack";
import Image from "next/image";

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={style.container}>
      <Image src={banner} />
      <h1 className={style.heading}>Opa! Ocorreu um erro.</h1>
      <p className={style.text}>
        Não conseguimos carregar a página, volte para seguir navegando.
      </p>
      <Link href="/">
        Voltar ao feed <ArrowBack color="#81FE88" />
      </Link>
    </div>
  );
}
