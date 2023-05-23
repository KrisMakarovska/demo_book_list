type Props = {
  popupAction: string;
};

export const PopupMessege = ({ popupAction }: Props) => {
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
