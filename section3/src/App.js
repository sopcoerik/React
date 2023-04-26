import { ProfileCard } from "./ProfileCard";
import CortanaImage from "./images/cortana.png";
import AlexaImage from "./images/alexa.png";
import SiriImage from "./images/siri.png";
import bulma from "bulma/css/bulma.css";

export default function App() {
  return (
    <div>
      <div className="hero is-primary">
        <div className="hero-body">
          <p className="title">Personal Digital Assistants</p>
        </div>
      </div>
      <div className="container">
        <div className="columns is-4">
          <div className="column is-4">
            <ProfileCard
              title="Cortana"
              tag="@cortana75"
              image={CortanaImage}
              description="Cortana was made by Microsoft"
            />
          </div>
          <div className="column is-4">
            <ProfileCard
              title="Alexa"
              tag="@alexa05"
              image={AlexaImage}
              description="Alexa was created by Amazon"
            />
          </div>
          <div className="column is-4">
            <ProfileCard
              title="Siri"
              tag="@siri22"
              image={SiriImage}
              description="Siri was made by Apple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
