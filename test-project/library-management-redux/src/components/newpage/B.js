import { useAuthors } from "../../hooks/useAuthors";
import Loader from "../utils/Loader";
import { useTheme } from "../../hooks/useTheme";

function B() {
  const theme = useTheme();

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
    <div className={`${theme === "dark" && "bg-black text-white"}`}>
      <p className="text-xl font-bold mb-5">B</p>
      <button
        onClick={reloadAuthors}
        className={`rounded border bg-slate-100 border-black mb-5 py-1 px-3 ${
          theme === "dark" && "text-white bg-gray-700 border-white"
        }`}
      >
        Reload Authors
      </button>
      <div>{content}</div>
    </div>
  );
}

export default B;
