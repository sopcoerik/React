import Accordeon from "../components/Accordeon";

function AccordeonPage() {
  const options = [
    {
      id: "23",
      header: "header 1",
      text: "this is the first header's content",
    },
    {
      id: "46",
      header: "header 2",
      text: "this is the second header's content",
    },
    {
      id: "13",
      header: "header 3",
      text: "this is the third header's content",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl mx-8 my-4">Accordeon</h1>
      <Accordeon options={options} />;
    </div>
  );
}

export default AccordeonPage;
