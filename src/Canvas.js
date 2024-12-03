export default function Canvas({ info }) {
  if (!info) {
    return <p>Click the button to get a random Space image!</p>;
  }
  return (
    <div style={{ overflow: "scroll" }}>
      <section>{info.title}</section>
      <p>
        <img src={info.url} alt={info.title} />
      </p>
    </div>
  );
}
