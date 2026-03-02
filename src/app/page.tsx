// import prisma from "@/lib/prisma";

export default async function Home() {
  // await prisma.user.delete({where: {id: "cmm14daan00008cv5kjedktfd"}})
  return (
    <>
      <div className="bg-primary/5 overflow-y-scroll h-full layers-scroll p-5">
        <div className="h-50 w-full mb-5 grid grid-cols-6 gap-3">
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
          <div className="card rounded-border h-full bg-[red] border-2 border-[var(--gray)]" />
         
        </div>
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="rounded-border card h-50 w-full border-2 border-[var(--gray)] mb-5 p-3"
          />
        ))}
      </div>
    </>
  );
}
