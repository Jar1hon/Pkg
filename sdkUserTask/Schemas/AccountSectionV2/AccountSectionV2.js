define("AccountSectionV2", [], function () {
  return {
    /* Название схемы страницы раздела. */
    entitySchemaName: "Account",
    /* Методы модели представления страницы раздела. */
    methods: {
      /* Проверяет заполнение поля [Основной контакт] у выбранного контрагента. */
      isAccountPrimaryContactSet: function () {
        /* Определяет активную запись. */
        var activeRowId = this.get("ActiveRow");
        if (!activeRowId) {
          return false;
        }
        /* Получает коллекцию данных списочного представления реестра раздела. Получает модель выбранного контрагента по заданому значению первичной колонки. */
        var selectedAccount = this.get("GridData").get(activeRowId);
        if (selectedAccount) {
          /* Получает свойство модели — основной контакт. */
          var selectedPrimaryContact = selectedAccount.get("PrimaryContact");
          /* Возвращает true, если основной контакт заполнен, в другом случае — false. */
          return selectedPrimaryContact ? true : false;
        }
        return false;
      },
    },
  };
});
