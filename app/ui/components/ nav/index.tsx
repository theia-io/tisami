import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex gap-2 flex-wrap items-center">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/"
      >
        <Image
          aria-hidden
          src="/uaflag.png"
          alt="memuseum"
          width={16}
          height={16}
        />

        MemeMuseum 
      </Link> - Меми твого дитинства
    </nav>
  );
}
