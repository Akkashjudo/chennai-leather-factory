import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-ink pt-24 text-ivory">
      <div className="container-x">
        <p className="eyebrow mb-5 text-tan">404</p>
        <h1 className="display max-w-2xl text-[2.8rem] sm:text-7xl">This page isn&rsquo;t on our shelves.</h1>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="light">Back to home</Button>
          <Button href="/products" variant="outline-light">Browse products</Button>
        </div>
      </div>
    </section>
  );
}
