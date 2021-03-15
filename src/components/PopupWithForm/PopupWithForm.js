function PopupWithForm(props) {
  return (
      <div className={`popup popup_type_ ${props.type} ${props.isOpen ? 'popup_is-opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__closeBtn" onClick={props.onClose}/>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
        </div>
      </div>
  )
}

export default PopupWithForm;