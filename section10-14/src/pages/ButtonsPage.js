import Button from "../components/Button";

function ButtonsPage() {
  return (
    <div className="buttons">
      <h1 className="text-4xl m-3">Buttons</h1>
      <div className="button-container">
        <Button primary className="hi" onClick={() => console.log("hi")}>
          Primary
        </Button>
        <Button secondary rounded>
          Secondary
        </Button>
        <Button success>Success</Button>
        <Button outlined primary>
          Primary & Outlined
        </Button>
        <Button danger rounded>
          Danger & Rounded
        </Button>
        <Button warning rounded>
          Warning & Rounded
        </Button>
        <Button danger outlined rounded>
          Danger & Outlined & Rounded
        </Button>
      </div>
    </div>
  );
}

export default ButtonsPage;
