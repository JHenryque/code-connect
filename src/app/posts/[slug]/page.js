import { remark } from "remark";
import html from "remark-html";
import styles from "./page.module.css";
import { CardPost } from "@/components/CardPost";
import db from "../../../../prisma/db";
import logger from "@/logger";
import { redirect } from "next/navigation";

async function getPostBySlug(slug) {
  // const url = `http://localhost:3042/posts?slug=${slug}`;
  // const response = await fetch(url);
  // if (!response.ok) {
  //   loggers.console.error("Ops, algo deu errado!");
  //   return {};
  // }

  // // loggers.info("Post carregado com sucesso!");
  // const data = await response.json();

  // if (data.length === 0) {
  //   loggers.info(`Nenhum post encontrado com o slug: ${slug}`);
  //   return {};
  // }

  // const post = data[0];

  try {
    const post = await db.post.findFirst({
      where: {
        slug,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new Error(`Post com o slug ${slug} não foi encontrado`);
    }

    const processedContent = await remark().use(html).process(post.markdown);
    const contentHtml = processedContent.toString();

    post.markdown = contentHtml;

    return post;
  } catch (error) {
    logger.error("Falha ao obter o post com o slug: ", {
      slug,
      error,
    });
  }
  redirect("/_not-found.js");
}

export default async function PagePost({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <>
      <CardPost post={post} highlight />
      <h3 className={styles.subtitle}>Código:</h3>
      <div className={styles.code}>
        <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
      </div>
    </>
  );
}
