define("ContactPageV2", [
  "BusinessRuleModule",
  "ConfigurationConstants",
], function (BusinessRuleModule, ConfigurationConstants) {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "Contact",
    methods: {
      ////////////////////////////////////////////////////////////////////////
      //Добавление валидации номера телефона
      /* Переопределение базового метода, который инициализирует пользовательские валидаторы. */
      setValidationConfig: function () {
        /* Вызывает инициализацию валидаторов родительской модели представления. */
        this.callParent(arguments);
        /* Для колонки [Phone] добавляется метод-валидатор phoneValidator(). */
        this.addColumnValidator("MobilePhone", this.phoneValidator);
      },
      /* Метод-валидатор значения колонки [Phone]. */
      phoneValidator: function (value) {
        /* Переменная для хранения сообщения об ошибке валидации. */
        var invalidMessage = "";
        /* Переменная для хранения результата проверки номера. */
        var isValid = true;
        /* Переменная для хранения номера телефона. */
        var number = value || this.get("Phone");
        /* Определение правильности формата номера с помощью регулярного выражения. */
        isValid =
          Ext.isEmpty(number) ||
          new RegExp("^\\+7\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{4}$").test(number);
        /* Если формат номера неправильный, то заполняется сообщение об ошибке. */
        if (!isValid) {
          invalidMessage = this.get(
            "Resources.Strings.InvalidPhoneFormatMessage"
          );
        }
        /* Объект, свойство которого содержит сообщение об ошибке валидации. Если валидация прошла успешна, то в объекте возвращается пустая строка. */
        return {
          invalidMessage: invalidMessage,
        };
      },
    },
    ////////////////////////////////////////////////////////////////////////
    //ОБЯЗАТЕЛЬНОСТЬ ПОЛЯ
    /* Бизнес-правила модели представления страницы записи. */
    rules: {
      /* Набор правил для колонки [Phone] модели представления. */
      MobilePhone: {
        /* Зависимость обязательности поля [Phone] от значения в поле [Type]. */
        BindParameterRequiredAccountByType: {
          /* Тип правила BINDPARAMETER. */
          ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
          /* Правило регулирует свойство REQUIRED. */
          property: BusinessRuleModule.enums.Property.REQUIRED,
          /* Массив условий для срабатывания правила. Определяет равно ли значение в колонке [Type] значению "Клиент". */
          conditions: [
            {
              /* Выражение левой части условия. */
              leftExpression: {
                /* Тип выражения — атрибут (колонка) модели представления. */
                type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                /* Название колонки модели представления, значение которой сравнивается в выражении. */
                attribute: "Type",
              },
              /* Тип операции сравнения — равно. */
              comparisonType: Terrasoft.ComparisonType.EQUAL,
              /* Выражение правой части условия. */
              rightExpression: {
                /* Тип выражения — константное значение. */
                type: BusinessRuleModule.enums.ValueType.CONSTANT,
                /* Значение, с которым сравнивается выражение левой части. */
                value: ConfigurationConstants.ContactType.Client,
              },
            },
          ],
        },
      },
      /////////////////////////////////////////////////////////////////////
      //ДОБАВЛЕНИЕ ПОЛЕЙ ГОРОД И РЕГИОН
      /* Набор правил для колонки [City] модели представления. */
      City: {
        /* Правило фильтрации колонки [City] по значению колонки [Region]. */
        FiltrationCityByRegion: {
          /* Тип правила FILTRATION. */
          ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
          /* Выполняется обратная фильтрация. */
          autocomplete: true,
          /* Выполняется очистка значения при изменении значения колонки [Region]. */
          autoClean: true,
          /* Путь к колонке для фильтрации в справочной схеме [City], на которую ссылается колонка [City] модели представления страницы записи. */
          baseAttributePatch: "Region",
          /* Тип операции сравнения в фильтре. */
          comparisonType: Terrasoft.ComparisonType.EQUAL,
          /* Тип выражения — атрибут (колонка) модели представления. */
          type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
          /* Название колонки модели представления, значение которой сравнивается в выражении. */
          attribute: "Region",
        },
      },
      /* Набор правил для колонки [Region] модели представления. */
      Region: {
        FiltrationRegionByCountry: {
          ruleType: BusinessRuleModule.enums.RuleType.FILTRATION,
          autocomplete: true,
          autoClean: true,
          baseAttributePatch: "Country",
          comparisonType: Terrasoft.ComparisonType.EQUAL,
          type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
          attribute: "Country",
        },
      },
      //////////////////////////////////////////////////////////////////////
      //БЛОКИРОВКА ПОЛЯ
      /* Набор правил для колонки [Phone] модели представления. */
      Phone: {
        /* Зависимость обязательности поля [Phone] от значения в поле [MobilePhone]. */
        BindParameterEnabledPhoneByMobile: {
          /* Тип правила BINDPARAMETER. */
          ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
          /* Правило регулирует свойство ENABLED. */
          property: BusinessRuleModule.enums.Property.ENABLED,
          /* Массив условий для срабатывания правила. Определяет установлено ли значение в колонке [MobilePhone]. */
          conditions: [
            {
              /* Выражение левой части условия. */
              leftExpression: {
                /* Тип выражения — атрибут (колонка) модели представления. */
                type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
                /* Название колонки модели представления, значение которой сравнивается в выражении. */
                attribute: "MobilePhone",
              },
              /* Тип операции сравнения — не равно. */
              comparisonType: Terrasoft.ComparisonType.NOT_EQUAL,
              /* Выражение правой части условия. */
              rightExpression: {
                /* Тип выражения — константное значение. */
                type: BusinessRuleModule.enums.ValueType.CONSTANT,
                /* Значение, с которым сравнивается выражение левой части. */
                value: "",
              },
            },
          ],
        },
      },
    },
    /* Отображение поля на странице записи. */
    diff: [
      /////////////////////////////////////////////////////////////////////
      //Добавление поля СТРАНА
      /* Метаданные для добавления на страницу поля [Страна]. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется поле. */
        parentName: "ProfileContainer",
        /* Поле добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя добавляемого поля. */
        name: "Country",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Тип поля — справочник. */
          contentType: Terrasoft.ContentType.LOOKUP,
          /* Настройка расположения поля. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 6,
            /* Диапазон занимаемых столбцов. */
            colSpan: 24,
          },
        },
      },
      ///////////////////////////////////////////////////////////////
      //ДОБАВЛЕНИЕ ПОЛЕЙ ГОРОД И РЕГИОН
      /* Метаданные для добавления на страницу записи поля [Country]. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется поле. */
        parentName: "ProfileContainer",
        /* Поле добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя добавляемого поля. */
        name: "Country",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Тип поля — справочник. */
          contentType: Terrasoft.ContentType.LOOKUP,
          /* Настройка расположения поля. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 7,
            /* Диапазон занимаемых столбцов. */
            colSpan: 24,
          },
        },
      },
      /* Метаданные для добавления на страницу записи поля [Region]. */
      {
        operation: "insert",
        parentName: "ProfileContainer",
        propertyName: "items",
        name: "Region",
        values: {
          contentType: Terrasoft.ContentType.LOOKUP,
          layout: {
            column: 0,
            row: 8,
            colSpan: 24,
          },
        },
      },
      /* Метаданные для добавления на страницу записи поля [City]. */
      {
        operation: "insert",
        parentName: "ProfileContainer",
        propertyName: "items",
        name: "City",
        values: {
          contentType: Terrasoft.ContentType.LOOKUP,
          layout: {
            column: 0,
            row: 6,
            colSpan: 24,
          },
        },
      },
      ////////////////////////////////////////////////////////////////////////////
      //ИНФОРМАЦИОННАЯ КНОПКА
      {
        /* Выполняется операция изменения существующего элемента. */
        operation: "merge",
        /* Мета-имя родительского контейнера, в который добавляется информационная кнопка. */
        parentName: "ProfileContainer",
        /* Информационная кнопка добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя изменяемого поля. */
        name: "AccountName",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Настройка расположения информационной кнопки. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 1,
            /* Диапазон занимаемых столбцов. */
            colSpan: 22,
            /* Диапазон занимаемых строк. */
            rowSpan: 1,
          },
        },
      },
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        parentName: "ProfileContainer",
        propertyName: "items",
        name: "SimpleInfoButton",
        values: {
          layout: {
            column: 22,
            row: 1,
            colSpan: 1,
            rowSpan: 1,
          },
          /* Тип добавляемого элемента — информационная кнопка. */
          itemType: Terrasoft.ViewItemType.INFORMATION_BUTTON,
          /* Текст подсказки. */
          content: { bindTo: "Resources.Strings.InfoButtonCaption" },
        },
      },
      ////////////////////////////////////////////////////////////////////
      //ВСПЛЫВАЮЩАЯ ПОДСКАЗКА
      /* Метаданные для добавления к полю всплывающей подсказки. */
      {
        /* Выполняется операция изменения существующего элемента. */
        operation: "merge",
        /* Мета-имя изменяемого поля. */
        name: "Type",
        /* Мета-имя родительского контейнера, в котором изменяется поле. */
        parentName: "ContactGeneralInfoBlock",
        /* Поле изменяется в коллекции элементов родительского элемента. */
        propertyName: "items",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Свойство поля, которое отвечает за отображение подсказки. */
          tip: {
            /* Текст подсказки. */
            content: { bindTo: "Resources.Strings.TypeFieldHint" },
            /* Режим отображения подсказки.
                          По умолчанию режим WIDE - толщина зеленой полоски, которая отображается в подсказке. */
            displayMode: Terrasoft.controls.TipEnums.displayMode.WIDE,
          },
        },
      },
    ],
  };
});
