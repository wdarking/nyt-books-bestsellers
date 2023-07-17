export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-3 py-5 text-center">
        <span className="text-sm leading-loose text-slate-500 md:text-left">
          Made by{" "}
          <a
            target="_blank"
            href="https://github.com/shoxton"
            rel="noreferrer"
            className="text-blue-600 font-medium hover:underline underline-offset-4"
          >
            @shoxton
          </a>
        </span>
      </div>
    </footer>
  );
}
