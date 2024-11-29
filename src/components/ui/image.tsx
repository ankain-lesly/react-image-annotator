export default function Image(props: { src: string; alt: string }) {
  return <img src={props.src} alt={props.alt} />;
}
