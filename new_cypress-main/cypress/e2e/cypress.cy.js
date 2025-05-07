import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка на позитивный кейс авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
          });
   afterEach('Конец теста', function () {
    cy.get(result_page.close).should('be.visible'); // Проверить наличие кнопки крестик и он виден прольз-ю
   });

          
    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // Ввели правильный логин
         cy.get(main_page.password).type(data.password); // Ввели правильный пароль
         cy.get(main_page.login_button).click(); // Нажать войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить нужный текст
         cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю 

     })
     it('Автотест на проверку логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажать «Забыли пароль»

        cy.get(recovery_password_page.email).type('tommi_29@mail.ru'); // Ввести имейл
        cy.get(recovery_password_page.send_button).click(); // Нажать "отправить код"

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверить нужный текст
        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю 
    
    })
    it('Проверка на негативный кейс авторизации', function () {
        cy.get(main_page.email).type(data.login); // Ввели правильный логин
        cy.get(main_page.password).type('Loveqastudio1'); // Ввели НЕправильный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить нужный текст
        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю 

    })
    it('Проверку на негативный кейс авторизации', function () {
        cy.get(main_page.email).type('german@dolnikof.ru'); // Ввели НЕправильный логин
        cy.get(main_page.password).type(data.password); // Ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить нужный текст
        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю 

    })
    it('Проверка на негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
        cy.get(main_page.password).type(data.password); // Ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю

    })
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели логин GerMan@Dolnikov.ru
        cy.get(main_page.password).type(data.password); // Ввели правильный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить нужный текст
        cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю 

    })
    }) 