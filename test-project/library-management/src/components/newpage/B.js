import { useAuthors } from "../../hooks/useAuthors";
import Loader from "../utils/Loader";

function B() {
  const {
    state: { data, isLoading },
    reloadAuthors,
  } = useAuthors();

  const renderedAuthors = data.map((author) => (
    <div key={author.id}>{author.name}</div>
  ));

  let content;
  if (isLoading) {
    content = <Loader />;
  } else {
    content = renderedAuthors;
  }

  return (
    <div>
      <p className="text-xl font-bold mb-5">B</p>
      <button
        onClick={reloadAuthors}
        className="rounded border bg-slate-100 border-black mb-5"
      >
        Reload Authors
      </button>
      <div>{content}</div>
    </div>
  );
}

export default B;
