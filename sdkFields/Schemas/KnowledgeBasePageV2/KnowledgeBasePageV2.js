define("KnowledgeBasePageV2", [
  "KnowledgeBasePageV2Resources",
  "ConfigurationConstants",
], function (resources, ConfigurationConstants) {
  return {
    /* Название схемы объекта страницы записи. */
    entitySchemaName: "KnowledgeBase",
    /* Методы модели представления страницы раздела. */
    methods: {
      /////////////////////////////////////////////////////////////////////
      //Добавление картинки
      /* Вызывается перед открытием диалогового окна выбора изображения. */
      beforePhotoFileSelected: function () {
        return true;
      },
      /* Получает изображение по ссылке. */
      getPhotoSrcMethod: function () {
        /* Получает ссылку на изображение из колонки объекта. */
        var imageColumnValue = this.get("UsrLogo");
        /* Если ссылка установлена, то метод возвращает url файла с изображением. */
        if (imageColumnValue) {
          return this.getSchemaImageUrl(imageColumnValue);
        }
        /* Если ссылка не установлена, то возвращает изображение по умолчанию. */
        return this.Terrasoft.ImageUrlBuilder.getUrl(
          this.get("Resources.Images.DefaultLogo")
        );
      },
      /* Обрабатывает изменение изображения.
            photo — файл с изображением. */
      onPhotoChange: function (photo) {
        if (!photo) {
          this.set("UsrLogo", null);
          return;
        }
        /* Выполняет загрузку файла в базу данных. По окончании загрузки вызывается onPhotoUploaded. */
        this.Terrasoft.ImageApi.upload({
          file: photo,
          onComplete: this.onPhotoUploaded,
          onError: this.Terrasoft.emptyFn,
          scope: this,
        });
      },
      /* Сохраняет ссылку на измененное изображение.
            imageId — Id сохраненного файла из базы данных. */
      onPhotoUploaded: function (imageId) {
        var imageData = {
          value: imageId,
          displayValue: "Image",
        };
        /* Колонке изображения присваивается ссылка на изображение. */
        this.set("UsrLogo", imageData);
      },
    },
    /* Отображение поля на странице раздела. */
    diff: /**SCHEMA_DIFF*/ [
      /////////////////////////////////////////////////////////////////////
      //Добавление картинки
      /* Метаданные для добавления на страницу записи пользовательского поля с изображением. */
      {
        /* Выполняется операция добавления элемента на страницу. */
        operation: "insert",
        /* Мета-имя родительского контейнера, в который добавляется поле. */
        parentName: "Header",
        /* Изображение добавляется в коллекцию элементов родительского элемента. */
        propertyName: "items",
        /* Мета-имя добавляемого изображения. */
        name: "PhotoContainer",
        /* Свойства, передаваемые в конструктор элемента. */
        values: {
          /* Тип добавляемого элемента — контейнер. */
          itemType: Terrasoft.ViewItemType.CONTAINER,
          /* Имя CSS класса. */
          wrapClass: ["image-edit-container"],
          /* Настройка расположения изображения. */
          layout: {
            /* Номер столбца. */
            column: 0,
            /* Номер строки. */
            row: 0,
            /* Диапазон занимаемых строк. */
            rowSpan: 3,
            /* Диапазон занимаемых столбцов. */
            colSpan: 3,
          },
          /* Массив дочерних элементов. */
          items: [],
        },
      },
      /* Поле [UsrLogo] — поле с логотипом контрагента. */
      {
        operation: "insert",
        parentName: "PhotoContainer",
        propertyName: "items",
        name: "UsrLogo",
        values: {
          /* Метод, который получает изображение по ссылке. */
          getSrcMethod: "getPhotoSrcMethod",
          /* Метод, который вызывается при изменении изображения. */
          onPhotoChange: "onPhotoChange",
          /* Метод, который вызывается перед вызовом диалогового окна выбора изображения. */
          beforeFileSelected: "beforePhotoFileSelected",
          /* Свойство, которое определяет возможность редактирования изображения. */
          readonly: false,
          /* View-генератор элемента управления. */
          generator: "ImageCustomGeneratorV2.generateCustomImageControl",
        },
      },
      /* Изменение расположения поля [Name]. */
      {
        /* Выполняется операция изменения существующего элемента. */
        operation: "merge",
        name: "Name",
        parentName: "Header",
        propertyName: "items",
        values: {
          bindTo: "Name",
          layout: {
            column: 3,
            row: 0,
            colSpan: 20,
          },
        },
      },
      /* Изменение расположения поля [ModifiedBy]. */
      {
        operation: "merge",
        name: "ModifiedBy",
        parentName: "Header",
        propertyName: "items",
        values: {
          bindTo: "ModifiedBy",
          layout: {
            column: 3,
            row: 2,
            colSpan: 20,
          },
        },
      },
      /* Изменение расположения поля [Type]. */
      {
        operation: "merge",
        name: "Type",
        parentName: "Header",
        propertyName: "items",
        values: {
          bindTo: "Type",
          layout: {
            column: 3,
            row: 1,
            colSpan: 20,
          },
          contentType: Terrasoft.ContentType.ENUM,
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
