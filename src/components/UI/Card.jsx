export default function Card(props) {
  return (
    <>
      <div className="container px-5 py-3 rounded-md bg-secondary shadow-md">
        {props.children}
      </div>
    </>
  );
}
