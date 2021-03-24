import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
export default function ConfirmPopup(props) {
  return( 
    <PopupWithForm
              type="popupSubmit"
              title="Вы уверены?"
              onClose={props.onClose}
            >
              <input
                name="save-button"
                type="submit"
                value={props.value}
                className="popup__save-btn"
              />
            </PopupWithForm>
  )
}
