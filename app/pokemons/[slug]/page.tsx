export default function Page({ params }: { params: { slug: string } }) {
  return <div>{JSON.stringify(params)}</div>;
}
