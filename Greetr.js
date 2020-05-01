;(function (global, $) {
  // hidden within the scope of the IIFE and never directly accessible
  const supportedLanguages = ['en', 'es'];
  // informal greetings
  const greetings = {
    en: 'Hello',
    es: 'Hola'
  };
  // formal greetings
  const formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };
  // logger messages
  const logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  // 'new' an object
  const Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // prototype holds methods (to save memory space)
  Greetr.prototype = {
    // 'this' refers to the calling object at execution time
    fullName: function () {
      return `${this.firstName} ${this.lastName}`;
    },

    validate: function () {
      // check that is a valid language
      // references the externally inaccessible 'supportedLanguages' within the closure
      if (!supportedLanguages.includes(this.language)) {
        throw 'Invalid language';
      }
    },

    // retrieve messages from object by referring to properties using [] syntax
    greeting: function () {
      return `${greetings[this.language]} ${this.firstName}`;
    },

    formalGreeting: function () {
      return `${formalGreetings[this.language]}, ${this.fullName()}`;
    },

    // chainable methods return their own containing objects
    greet: function (formal = false) {
      const message = formal ? this.formalGreeting() : this.greeting();

      // if undefined or null it will be coerces to 'false'
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
      // make chainable
      return this;
    },

    setLang: function (language) {
      // set the language
      this.language = language;
      // validate
      this.validate();
      // make chainable
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
      // inject the message in the chosen place in the DOM
      $(selector).html(message);
      // make chainable
      return this;
    }
  };

  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  Greetr.init = function (firstName = '', lastName = '', language = 'en') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.language = language;

    this.validate();
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach our Greetr to the global object, and provide a shortand '$G' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
