import { useAuthors } from "../../hooks/useAuthors";
import Loader from "../utils/Loader";

function A() {
  const {
    state: { data, isLoading },
    reloadAuthors,
  } = useAuthors();

  const renderedAuthors = data.map((author) => <div>{author.name}</div>);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else {
    content = renderedAuthors;
  }

  return (
    <div>
      <p className="text-xl font-bold mb-5">A</p>
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

export default A;
