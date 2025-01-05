import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/terms-and-conditions"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Terms and Conditions
      </Link>

      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/cookies"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Cookies
      </Link>
    </footer>
  );
}
