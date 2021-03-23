import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import PopupWithForm from '../PopupWithForm.js';

<PopupWithForm
              type="popupEditAvatar"
              title="Обновить аватар"
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            >
              <input
                name="avatar"
                id="URL"
                type="url"
                className="popup__text popup__text_valid popupAvatarUrl"
                placeholder="Ссылка на аватар"
                required
              />
              <span id="URL-error" className="popup__error" />
              <button
                type="submit"
                className="popup__save-btn editAvatar-saveBtn"
              >
                Сохранить
              </button>
            </PopupWithForm>