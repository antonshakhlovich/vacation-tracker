export default function User({ status }) {
  return status ? <h1>Hello user!</h1> : <h1>Please log in</h1>;
}
