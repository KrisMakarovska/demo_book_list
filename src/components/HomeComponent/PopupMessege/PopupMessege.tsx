import { useContext } from "react";
import { SharedDataContext } from "../../../utils/context";

export const PopupMessege = () => {
  const { popupAction } = useContext(SharedDataContext);

  return (
    <div className="popup">
      <div className="popup__background">
        <p
          className={`popup__text--${popupAction}`}
        >{`The book has been ${popupAction}!`}</p>
      </div>
    </div>
  );
};
