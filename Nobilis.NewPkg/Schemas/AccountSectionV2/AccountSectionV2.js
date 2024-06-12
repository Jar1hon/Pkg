define("AccountSectionV2", [], function () {
  return {
    /* Название схемы объекта раздела. */
    entitySchemaName: "Account",
    /* Методы модели представления раздела. */
    methods: {
      /* Метод-обработчик нажатия кнопки. */
      onNsFetchFromDbButton: function () {
        //Пример добавления в коллекцию колонок запроса колонки из корневой схемы
        // var message = "";
        // // Создаем экземпляр класса Terrasoft.EntitySchemaQuery с корневой схемой Account.
        // var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
        //   rootSchemaName: "Account",
        // });
        // // Добавление колонки с названием.
        // esq.addColumn(
        //   "Name",
        //   "Name"
        // );
        // //Получение записи из выборки по Id объекта.
        // esq.getEntity(
        //   "405947d0-2ffb-4ded-8675-0475f19f5a81",
        //   function (result) {
        //     if (!result.success) {
        //       this.showInformationDialog("Error");
        //       return;
        //     }
        //     message = result.entity.get("Name");
        //     this.showInformationDialog(message);
        //   },
        //   this
        // );
        // /* Получить конкретную строку набора данных по заданному первичному ключу. */
        // /* Получаем Id объекта карточки. */
        // var recordId = "c4ed336c-3e9b-40fe-8b82-5632476472b4";
        // /* Создаем экземпляр класса Terrasoft.EntitySchemaQuery с корневой схемой Contact. */
        // var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
        //   rootSchemaName: "Contact",
        // });
        // /* Добавляем колонку с именем основного контакта контрагента. */
        // esq.addColumn("Account.PrimaryContact.Name", "PrimaryContactName");
        // /* Получаем одну запись из выборки по Id объекта карточки и отображаем ее в информационном окне. */
        // esq.getEntity(
        //   recordId,
        //   function (result) {
        //     if (!result.success) {
        //       /* Например, обработка/логирование ошибки. */
        //       this.showInformationDialog("Ошибка запроса данных");
        //       return;
        //     }
        //     this.showInformationDialog(result.entity.get("PrimaryContactName"));
        //   },
        //   this
        // );
        //Получить весь результирующий набор данных.
        // var message = "";
        // /* Создаем экземпляр класса Terrasoft.EntitySchemaQuery с корневой схемой Contact. */
        // var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
        //   rootSchemaName: "Contact",
        // });
        // /* Добавляем колонку с названием контрагента, который относится к данному контакту. */
        // esq.addColumn("Name", "ContactName");
        // /* Добавляем колонку с именем основного контакта контрагента. */
        // esq.addColumn("City.Name", "CityName");
        // /* Получаем всю коллекцию записей и отображаем ее в информационном окне. */
        // esq.getEntityCollection(function (result) {
        //   if (!result.success) {
        //     /* Например, обработка/логирование ошибки. */
        //     this.showInformationDialog("Ошибка запроса данных");
        //     return;
        //   }
        //   result.collection.each(function (item) {
        //     message +=
        //       "Имя контакта: " +
        //       item.get("ContactName") +
        //       " - город проживания: " +
        //       item.get("CityName") +
        //       "\n";
        //   });
        //   this.showInformationDialog(message);
        // }, this);

        //Примеры управления фильтрами в запросе
        // var message = "";
        // /* Создание экземпляра запроса с корневой схемой Contact. */
        // var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
        //   rootSchemaName: "Contact",
        // });
        // esq.addColumn("Name");
        // esq.addColumn("Country.Name", "CountryName");

        // /* Создание экземпляра первого фильтра. */
        // var esqFirstFilter = esq.createColumnFilterWithParameter(
        //   Terrasoft.ComparisonType.EQUAL,
        //   "Country.Name",
        //   "Россия"
        // );

        // /* Создание экземпляра второго фильтра. */
        // var esqSecondFilter = esq.createColumnFilterWithParameter(
        //   Terrasoft.ComparisonType.EQUAL,
        //   "Country.Name",
        //   "Соединенные Штаты"
        // );

        // /* Фильтры в коллекции фильтров запроса будут объединяться логическим оператором OR. */
        // esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;

        // /* Добавление созданных фильтров в коллекцию запроса. */
        // esq.filters.add("esqFirstFilter", esqFirstFilter);
        // esq.filters.add("esqSecondFilter", esqSecondFilter);

        // /* Для второго фильтра указывается, что он не будет участвовать в построении результирующего запроса. При этом данный фильтр не удаляется из коллекции фильтров запроса. */
        // esqSecondFilter.isEnabled = false;
        // /* В данную коллекцию попадут объекты - результаты запроса, отфильтрованные по двум фильтрам. */
        // esq.getEntityCollection(function (result) {
        //   if (!result.success) {
        //     /* Например, обработка/логирование ошибки. */
        //     this.showInformationDialog("Ошибка запроса данных");
        //     return;
        //   }
        //   result.collection.each(function (item) {
        //     message +=
        //       "Имя контакта: " +
        //       item.get("Name") +
        //       " - страна проживания: " +
        //       item.get("CountryName") +
        //       "\n";
        //   });
        //   this.showInformationDialog(message);
        // }, this);

        //Пример использования других методов создания фильтров
        /* Создание экземпляра запроса с корневой схемой Contact. */
        var message = "";
        var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
          rootSchemaName: "Contact",
        });
        esq.addColumn("Name");
        esq.addColumn("Country.Name", "CountryName");

        /* Выбираем все контакты, в которых не указана страна. */
        var esqFirstFilter = esq.createColumnIsNullFilter("Country");

        /* Выбираем все контакты, даты рождения которых находятся в промежутке между 1.01.1970 и 1.01.1980. */
        var dateFrom = new Date(1970, 0, 1, 0, 0, 0, 0);
        var dateTo = new Date(1980, 0, 1, 0, 0, 0, 0);
        var esqSecondFilter = esq.createColumnBetweenFilterWithParameters(
          "BirthDate",
          dateFrom,
          dateTo
        );

        /* Добавление созданных фильтров в коллекцию запроса. */
        esq.filters.add("esqFirstFilter", esqFirstFilter);
        esq.filters.add("esqSecondFilter", esqSecondFilter);

        /* В данную коллекцию попадут объекты - результаты запроса, отфильтрованные по двум фильтрам. */
        esq.getEntityCollection(function (result) {
          if (result.success) {
            result.collection.each(function (item) {
              message +=
                "Имя контакта: " +
                item.get("Name") +
                " - страна проживания: " +
                item.get("CountryName") +
                "\n";
            });
            this.showInformationDialog(message);
          }
        }, this);
      },
    },

    /* Отображение кнопки в разделе. */
    diff: /**SCHEMA_DIFF*/ [
      /* Метаданные для добавления в раздел пользовательской кнопки. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется кнопка. */
        parentName: "ActionButtonsContainer",
        /* Кнопка добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя добавляемой кнопки. */
        name: "MainContactSectionButton",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Тип добавляемого элемента — кнопка. */
          itemType: Terrasoft.ViewItemType.BUTTON,
          /* Привязка заголовка кнопки к локализуемой строке схемы. */
          caption: {
            bindTo: "Resources.Strings.NsFetchFromDbButton",
          },
          /* Привязка метода-обработчика нажатия кнопки. */
          click: { bindTo: "onNsFetchFromDbButton" },
          /* Привязка свойства доступности кнопки. */
          enabled: true,
          /* Настройка расположения кнопки. */
          layout: {
            /* Номер столбца. */
            column: 1,
            /* Номер строки. */
            row: 6,
            /* Диапазон занимаемых столбцов. */
            colSpan: 1,
          },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
