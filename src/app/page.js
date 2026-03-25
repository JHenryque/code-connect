import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from "next/link";
import stylle from "./page.module.css";
import db from "../../prisma/db";

const post = {
  id: 1,
  cover:
    "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png",
  title: "Introdução ao React",
  slug: "introducao-ao-react",
  body: "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
  markdown:
    "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
  author: {
    id: 101,
    name: "Ana Beatriz",
    username: "anabeatriz_dev",
    avatar:
      "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png",
  },
};

async function getAllPosts(page = 1) {
  // const response = await fetch(
  //   `http://localhost:3042/posts?_page=${page}&_per_page=6`,
  // );
  // if (!response.ok) {
  //   logger.error("Ops, algo deu errado!");
  //   return [];
  // }
  // logger.info("Posts carregados com sucesso!");
  // return response.json();

  try {
    const perPage = 6;
    const skip = (page - 1) * perPage;

    const prev = page > 1 ? page - 1 : null;
    const totalPosts = await db.post.count();
    const totalPages = Math.ceil(totalPosts / perPage);
    const next = page < totalPages ? page + 1 : null;

    const posts = await db.post.findMany({
      take: perPage,
      orderBy: { createdAt: "desc" },
      skip: skip,
      include: {
        author: true,
      },
    });

    return { data: posts, prev, next };
  } catch (error) {
    logger.error("Falha ao obter posts", { error });
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const { data: posts, prev, next } = await getAllPosts(currentPage);
  return (
    <main className="grid">
      {posts.map((post) => (
        <CardPost key={post.id} post={post} />
      ))}
      <div className={stylle.links}>
        {prev && <Link href={`/?page=${prev}`}>Pagina Anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próximo pagina</Link>}
      </div>
    </main>
  );
}
