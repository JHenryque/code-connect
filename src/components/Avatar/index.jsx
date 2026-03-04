import Image from "next/image";
import stylle from "./avatar.module.css";

export const Avatar = ({ name, imageSrc }) => {
  return (
    <ul className={stylle.avatar}>
      <li>
        <Image
          src={imageSrc}
          alt={`Imagem de ${name}`}
          width={32}
          height={32}
        />
      </li>
      <li>@{name}</li>
    </ul>
  );
};
