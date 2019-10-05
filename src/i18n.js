import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "home": "Home",
      "cart": "Cart",
      "order": "Order now",
      "addnewpost": "Add new post",
      "login": "Log in", 
      "logout": "Log out", 
      "registration": "Registration", 
      "add": "Add",
      "remove": "Remove",
      'delete': 'Delete',
      'update': 'Update',
      'title': 'Title',
      'price': 'Price',
      'more': 'more...',
      'email': 'Email',
      'password': 'Password',
      'updatePassword': 'Update password',
      'newpassword': 'New password',
      'oldpassword': 'Old password',
      'reset': 'Reset password',
      'name': 'Name',
      'surname': 'Surname',
      'phone': "Phone",
      'addNewPost': 'Add new post',
      'updPost': 'Update this post',
      'search': 'Search',
      'from' : 'From',
      'to': 'To',
      'first': 'First',
      'previous': 'Previous',
      'next': 'Next',
      'last':'Last',
      'number': 'Number',
      'clean': 'Clean',
      'total': 'Total',
      'back' : 'Back',
      'author': 'Author',
      'genre': 'Ganre',
      'newProductAdd': 'New book add',
      'productUpd': 'Book updated',
      'check': 'Check info',
      'apply' : 'Apply',
      'allRight': 'All right',
      'only characters': 'only characters, at least two',
      'numbers': "Only numbers from 9 to 12",
      '@': 'Enter mail',
      'wrong password': 'Wrong password',
      'wrong email': 'Wrong email',
      'password length': 'Password must be longer than 6 characters',
      'signed': 'Signed in as',
      'email exist': 'This mail already exists',
      'wrong email or password': 'Wrong email or password'
      
    }
  },
  ru: {
    translation: {
      "home": "Главная",
      "cart": "Корзина",
      "order": "Заказать сейчас",
      "addnewpost": "Добавить пост",
      "login": "Войти", 
      "logout": "Выйти", 
      "registration": "Регистрация", 
      "add": "Добавить",
      "delete": "Удалить",
      'update': 'Обновить',
      "remove": "Убрать",
      'title': 'Заголовок',
      'price': 'Цена',
      'more': 'больше...',
      'email': 'Почта',
      'password': 'Пароль',
      'updatePassword': 'Обновить пароль',
      'newpassword': 'Новый пароль',
      'oldpassword': 'Старый пароль',
      'reset': 'Сбросить пароль',
      'name': 'Имя',
      'surname': 'Фамилия',
      'phone': "Телефон",
      'addNewPost': 'Добавть пост',
      'updPost': 'Обновить этот пост',
      'search': 'Поиск',
      'from' : 'Искать с',
      'to': 'Искать по',
      'first': 'Первая',
      'previous': 'Предыдущий',
      'next': 'Следующий',
      'last':'Последний',
      'number': 'Кол-во',
      'clean': 'Очистить',
      'total': 'Всего',
      'back' : 'Назад',
      'author': 'Автор',
      'genre': 'Жанр',
      'newProductAdd': 'Новая книга добавлена',
      'productUpd': 'Книга обновлена',
      'check': 'Проверьте информацию',
      'apply' : 'Далее',
      'allRight': 'Все верно',
      'only characters': 'Только символы',
      'numbers': "Только цифры от 9 до 12",
      '@': 'Введите почту',
      'wrong password': 'Неверный пароль',
      'wrong email': 'Неверный email',
      'password length': 'Длина пароля должна быть больше 6 символов',
      'signed': 'Вы вошли как',
      'email exist': 'Эта почта уже существует',
      'wrong email or password': 'Неверный пароль или email'
    }
  }
};

let defLang = 'ru';
if(localStorage.lang !== undefined){
  defLang = localStorage.lang;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defLang,
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;