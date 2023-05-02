import Modal from "../components/Modal";
import Button from "../components/Button";
import { useState } from "react";

function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button primary onClick={handleOpen}>
        Open Modal
      </Button>
      {isOpen ? <Modal handleClose={handleClose} /> : false}

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo enim,
        impedit suscipit laborum nihil minus error obcaecati nobis provident
        minima totam, eaque doloribus. Excepturi minima enim odio fugit
        pariatur, est officiis consequuntur suscipit expedita quibusdam animi
        perspiciatis ex a sint atque necessitatibus in quo delectus magni sequi
        officia id dicta odit ea. Molestiae, assumenda? Vel quos aliquam eveniet
        in debitis possimus? Optio qui vero quasi aliquid error architecto
        dolores quidem officiis adipisci! Accusamus facilis officia ex, ipsam
        eligendi nulla, tempora repudiandae fugit dolorem quasi exercitationem
        quas. Vero, magnam illo? Alias recusandae quae quam facere, quasi rerum
        iste aperiam fugit assumenda!
      </p>
    </div>
  );
}

export default ModalPage;
