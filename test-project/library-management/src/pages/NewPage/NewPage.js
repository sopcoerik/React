import A from "../../components/newpage/A";
import B from "../../components/newpage/B";

function NewPage() {
  return (
    <div className="container mx-auto grid grid-cols-2">
      <div>
        <A />
      </div>
      <div>
        <B />
      </div>
    </div>
  );
}

export default NewPage;
