import Image from "next/image";

export function Logo() {
  return (
    <a href="/">
      <Image src="/logo.png" width={120} height={57} alt="PokéAPI" />
      <h1 className="sr-only">Pokedex</h1>
    </a>
  );
}
