import Image from "next/image";
import { Avatar } from "../Avatar";
import style from "./card.module.css";

export const CardPost = ({ post }) => {
  "";
  return (
    <article className={style.card}>
      <header className={style.header}>
        <figure className={style.figure}>
          <Image
            src={post.cover}
            alt={`Capa do post ${post.title}`}
            width={438}
            height={133}
          />
        </figure>
      </header>
      <section className={style.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </section>
      <footer className={style.footer}>
        <Avatar name={post.author.name} imageSrc={post.author.avatar} />
      </footer>
    </article>
  );
};
