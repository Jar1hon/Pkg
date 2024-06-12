define("UsrClass1Page", ["ServiceHelper", "ProcessModuleUtilities"], function (
  ServiceHelper,
  ProcessModuleUtilities
) {
  return {
    entitySchemaName: "UsrClass",
    messages: {
      /* Сообщение, которое вызывает обновление детали. */
      AddingTrainings: {
        mode: Terrasoft.MessageMode.BROADCAST,
        direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
      },
      FromSection: {
        mode: Terrasoft.MessageMode.BROADCAST,
        direction: Terrasoft.MessageDirectionType.SUBSCRIBE,
      },
    },
    attributes: {
      /* Атрибут, который хранит текущее количество активных ежедневных секций. */
      responseCollectionTrainings: {
        dataValueType: Terrasoft.DataValueType.INTEGER,
        type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
      },
      /* Атрибут, который хранит значение системной настройки. */
      maximumDailyActiveSections: {
        dataValueType: Terrasoft.DataValueType.INTEGER,
        type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
      },
    },
    modules: /**SCHEMA_MODULES*/ {} /**SCHEMA_MODULES*/,
    details: /**SCHEMA_DETAILS*/ {
      Files: {
        schemaName: "FileDetailV2",
        entitySchemaName: "UsrClassFile",
        filter: {
          masterColumn: "Id",
          detailColumn: "UsrClass",
        },
      },
      UsrSchema5d0d999aDetail9211e843: {
        schemaName: "UsrSchema5d0d999aDetail",
        entitySchemaName: "UsrGroupTraining",
        filter: {
          detailColumn: "UsrClass",
          masterColumn: "Id",
        },
      },
    } /**SCHEMA_DETAILS*/,
    businessRules: /**SCHEMA_BUSINESS_RULES*/ {} /**SCHEMA_BUSINESS_RULES*/,
    methods: {
      /* Запускается при загрузке схемы страницы и вызывает метод подсчета текущего количества активных ежедневных секций и метод считывания значения системной настройки. */
      onEntityInitialized: function () {
        this.callParent(arguments);
        this.getPeriodicityActiveNumber();
        this.getMaximumDailyActiveSections();
        /* Код генерируется, если создается новый элемент или копия существующего. */
        if (this.isAddMode() || this.isCopyMode()) {
          /* Вызов базового метода Terrasoft.BasePageV2.getIncrementCode, который генерирует номер по ранее заданной маске. */
          this.getIncrementCode(function (response) {
            /* Сгенерированный номер возвращается в колонку [Code]. */
            this.set("UsrCode", response);
          });
        }
      },
      /* Вычисляет текущее количество активных ежедневных секций и записывает полученное значение в атрибут "responseCollectionTrainings". */
      getPeriodicityActiveNumber: function () {
        var periodicity = "Ежедневно";
        var esqPeriodicity = this.Ext.create("Terrasoft.EntitySchemaQuery", {
          rootSchemaName: "UsrClass",
        });
        esqPeriodicity.addColumn("UsrName");
        var groupFilters = this.Ext.create("Terrasoft.FilterGroup");
        var filterPerodicity = this.Terrasoft.createColumnFilterWithParameter(
          this.Terrasoft.ComparisonType.EQUAL,
          "UsrPeriodicity.Name",
          periodicity
        );
        var thisId = this.get("Id");
        var filterId = this.Terrasoft.createColumnFilterWithParameter(
          this.Terrasoft.ComparisonType.NOT_EQUAL,
          "Id",
          thisId
        );
        var filterIsActive = this.Terrasoft.createColumnFilterWithParameter(
          this.Terrasoft.ComparisonType.EQUAL,
          "UsrIsActive",
          true
        );
        groupFilters.addItem(filterPerodicity);
        groupFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
        groupFilters.addItem(filterIsActive);
        groupFilters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
        groupFilters.addItem(filterId);
        esqPeriodicity.filters.add(groupFilters);
        esqPeriodicity.getEntityCollection(function (result) {
          if (!result.success) {
            this.showInformationDialog("Request error");
            return;
          } else {
            var lengthCollection = result.collection.collection.length;
            this.set("responseCollectionTrainings", lengthCollection);
          }
        }, this);
      },
      /* Добавляет валидацию к полю "Периодичность". При изменении данного поля либо сохранении записи будет вызываться метод-валидатор. */
      setValidationConfig: function () {
        this.callParent(arguments);
        this.addColumnValidator("UsrPeriodicity", this.periodicityValidator);
      },
      /* Метод-валидатор — если секция ежедневная, сравнивает текущее количество активных ежедневных секций с системной настройкой "GymsNumber" и в случае превышения добавляет в поле "Периодичность" предупреждающее сообщение. Сохранение записи в таком случае невозможно. */
      periodicityValidator: function () {
        var invalidMessage = "";
        var periodicity = this.get("UsrPeriodicity").displayValue;
        if (periodicity === "Ежедневно") {
          var isActive = this.get("UsrIsActive");
          var myVariable = this.get("maximumDailyActiveSections");
          var lengthCollection = this.get("responseCollectionTrainings");
          if (lengthCollection >= myVariable && isActive) {
            invalidMessage =
              "The number of gyms is limited. No more than " +
              myVariable +
              " daily trainings.";
          }
        } else {
          invalidMessage = "";
        }
        return {
          invalidMessage: invalidMessage,
        };
      },
      /* Получает значение системной настройки "GymsNumber". */
      getMaximumDailyActiveSections: function () {
        var myVariable;
        var callback = function (value) {
          myVariable = value;
        };
        this.Terrasoft.SysSettings.querySysSettingsItem(
          "GymsNumber",
          callback,
          this
        );
        if (myVariable === undefined) {
          return;
        } else {
          this.set("maximumDailyActiveSections", myVariable);
        }
      },
      // ...

      init: function () {
        this.callParent(arguments);
        /* Подписка на сообщение, которое вызывает обновление детали. */
        this.sandbox.subscribe("AddingTrainings", this.updateTrainings, this);
        this.sandbox.subscribe("FromSection", this.onGetServiceInfoClick, this);
      },
      /* Добавляет действие в меню действий. */

      getActions: function () {
        var actionMenuItems = this.callParent(arguments);
        actionMenuItems.addItem(
          this.getButtonMenuItem({
            //this.getButtonMenuSeparator({
            Caption: { bindTo: "Resources.Strings.AddTrainingsActionCaption" },
            // Определяем метод-обработчик для действия.

            Click: { bindTo: "getBusinessProcessAddTrainings" },

            Enabled: true,
          })
        );
        return actionMenuItems;
      },
      /* Вызывает обновление детали на странице записи. */
      updateTrainings: function () {
        this.updateDetail({
          // Код детали.
          detail: "UsrSchema5d0d999aDetail9211e843",
          reloadAll: true,
        });
      },
      /* Метод-обработчик для нового действия в меню. */
      getBusinessProcessAddTrainings: function () {
        /* Получаем необходимые для процесса входящие параметры. */
        var id = this.get("Id");
        var periodicity = this.get("UsrPeriodicity").displayValue;
        var coach = this.get("UsrCoach").value;
        if (!periodicity) {
          return;
        }
        /* Создаем конфигурационный объект для запуска процесса. */
        var args = {
          /* Имя созданного в предыдущих пунктах процесса. */
          sysProcessName: "UsrAddTrainingsProcess",
          /* Входящие параметры процесса. */
          parameters: {
            ProcessSchemaId: id,
            ProcessSchemaPeriodicity: periodicity,
            ProcessSchemaCoach: coach,
          },
        };
        /* Запуск процесса. */
        ProcessModuleUtilities.executeProcess(args);
      },
      // ...

      /* The method that handles the button clicks. */
      onGetServiceInfoClick: function () {
        /* Retrieve the section code to pass as the incoming parameter of the service method. */
        var code = this.get("UsrCode");
        var serviceData = {
          code: code,
        };
        /* Call the service method. */
        ServiceHelper.callService(
          "UsrClassService",
          "GetTrainingsQuantity",
          function (response) {
            var result = response.GetTrainingsQuantityResult;
            /* Display the service method output in the dialog box. */
            this.showInformationDialog(result);
          },
          serviceData,
          this
        );
      },
    },
    dataModels: /**SCHEMA_DATA_MODELS*/ {} /**SCHEMA_DATA_MODELS*/,
    diff: /**SCHEMA_DIFF*/ [
      {
        operation: "insert",
        name: "UsrName09c2d3a2-8d86-4c4e-8103-f85f20e9b1b2",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 0,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrName",
          enabled: true,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 0,
      },
      {
        operation: "insert",
        name: "STRINGee5a5e35-d8ea-4817-9b01-38cccc50ca80",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 1,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrCode",
          enabled: true,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 1,
      },
      {
        operation: "insert",
        name: "LOOKUP102103bf-2d46-4628-b918-44438b933172",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 2,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrCoach",
          enabled: true,
          contentType: 5,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 2,
      },
      {
        operation: "insert",
        name: "LOOKUP4a7dca94-1c45-4a9c-829c-cd90cdc89875",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 3,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrPeriodicity",
          enabled: true,
          contentType: 3,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 3,
      },
      {
        operation: "insert",
        name: "STRINGb67da775-fa29-4973-bb3c-6a2766a5fb95",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 4,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrComment",
          enabled: true,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 4,
      },
      {
        operation: "insert",
        name: "BOOLEAN4f579948-de35-4884-8711-6ed2858b34e8",
        values: {
          layout: {
            colSpan: 24,
            rowSpan: 1,
            column: 0,
            row: 5,
            layoutName: "ProfileContainer",
          },
          bindTo: "UsrIsActive",
          enabled: true,
        },
        parentName: "ProfileContainer",
        propertyName: "items",
        index: 5,
      },
      {
        operation: "insert",
        name: "NotesAndFilesTab",
        values: {
          caption: {
            bindTo: "Resources.Strings.NotesAndFilesTabCaption",
          },
          items: [],
          order: 0,
        },
        parentName: "Tabs",
        propertyName: "tabs",
        index: 0,
      },
      {
        operation: "insert",
        name: "Files",
        values: {
          itemType: 2,
        },
        parentName: "NotesAndFilesTab",
        propertyName: "items",
        index: 0,
      },
      {
        operation: "insert",
        name: "NotesControlGroup",
        values: {
          itemType: 15,
          caption: {
            bindTo: "Resources.Strings.NotesGroupCaption",
          },
          items: [],
        },
        parentName: "NotesAndFilesTab",
        propertyName: "items",
        index: 1,
      },
      {
        operation: "insert",
        name: "Notes",
        values: {
          bindTo: "UsrNotes",
          dataValueType: 1,
          contentType: 4,
          layout: {
            column: 0,
            row: 0,
            colSpan: 24,
          },
          labelConfig: {
            visible: false,
          },
          controlConfig: {
            imageLoaded: {
              bindTo: "insertImagesToNotes",
            },
            images: {
              bindTo: "NotesImagesCollection",
            },
          },
        },
        parentName: "NotesControlGroup",
        propertyName: "items",
        index: 0,
      },
      {
        operation: "insert",
        name: "UsrSchema5d0d999aDetail9211e843",
        values: {
          itemType: 2,
          markerValue: "added-detail",
        },
        parentName: "NotesAndFilesTab",
        propertyName: "items",
        index: 2,
      },
      {
        operation: "merge",
        name: "ESNTab",
        values: {
          order: 1,
        },
      },
      // ...
      /* Добавляем элемент кнопка на страницу записи. */
      {
        operation: "insert",
        /* Имя родительского элемента. */
        parentName: "LeftContainer",
        propertyName: "items",
        /* Имя элемента. */
        name: "GetServiceInfoButton",
        values: {
          /* Тип элемента - кнопка. */
          itemType: Terrasoft.ViewItemType.BUTTON,
          /* Заголовок элемента получаем из локализованной строки. */
          caption: { bindTo: "Resources.Strings.GetServiceInfoButtonCaption" },
          /* Метод-обработчик нажатия кнопки. */
          click: { bindTo: "onGetServiceInfoClick" },
          enabled: true,
          /* Позиция кнопки на странице. */
          layout: { column: 1, row: 6, colSpan: 2, rowSpan: 1 },
        },
      },
    ] /**SCHEMA_DIFF*/,
  };
});
