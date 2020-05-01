(function (global, $) {

  const supportedLanguages = ['en', 'es'];
  const greetings = {
    en: 'Hello',
    es: 'Hola'
  };
  const formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };
  const logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  const Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  Greetr.prototype = {
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },

    validate: function () {
      if (!supportedLanguages.includes(this.language)) {
        throw 'Invalid language';
      }
    },

    greeting: function () {
      return `${greetings[this.language]} ${this.firstName}`;
    },

    formalGreeting: function () {
      return `${formalGreetings[this.language]}, ${this.fullName()}`;
    },

    greet: function (formal = false) {
      const message = formal ? this.formalGreeting() : this.greeting();

      if (console) {
        console.log(message);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(`${logMessages[this.language]}: ${this.fullName()}`);
      }

      return this;
    },

    setLang: function (language) {
      this.language = language;

      this.validate();

      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector';
      }

      const message = formal ? this.formalGreeting() : this.greeting();
      $(selector).html(message);

      return this;
    }
  };

  Greetr.init = function (firstName = '', lastName = '', language = 'en') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.language = language;
  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
