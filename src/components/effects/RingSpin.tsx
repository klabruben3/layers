export default function RingSpin({className}:{className?:string}) {
  return (
    <div className={`h-6 w-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin ${className}`} />
  );
}