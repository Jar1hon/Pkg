/* Объявление модуля с именем UsrLimitedIntegerEdit. Модуль не имеет никаких зависимостей, поэтому в качестве второго параметра передается пустой массив. */
define("UsrLimitedIntegerEdit", [], function () {
  /* Объявляет класс элемента управления. */
  Ext.define("Terrasoft.controls.UsrLimitedIntegerEdit", {
    /* Базовый класс. */
    extend: "Terrasoft.controls.IntegerEdit",
    /* Псевдоним класса. */
    alternateClassName: "Terrasoft.UsrLimitedIntegerEdit",
    /* Минимальное допустимое значение. */
    minLimit: -1000,
    /* Максимальное допустимое значение. */
    maxLimit: 1000,
    /* Проверяет вхождение введенного значения в диапазон допустимых значений. */
    isOutOfLimits: function (numericValue) {
      if (numericValue < this.minLimit || numericValue > this.maxLimit) {
        return true;
      }
      return false;
    },
    /* Переопределяет метод-обработчика события нажатия клавиши Enter. */
    onEnterKeyPressed: function () {
      /* Вызывает базовую функциональность. */
      this.callParent(arguments);
      /* Получает введенное значение. */
      var value = this.getTypedValue();
      /* Приводит значение к числовому типу. */
      var numericValue = this.parseNumber(value);
      /* Проверяет вхождение введенного значения в диапазон допустимых значений. */
      var outOfLimits = this.isOutOfLimits(numericValue);
      if (outOfLimits) {
        /* Генерирует предупреждающее сообщение. */
        var msg =
          "Value " +
          numericValue +
          " is out of limits [" +
          this.minLimit +
          ", " +
          this.maxLimit +
          "]";
        /* Изменяет конфигурационный объект, чтобы отобразить предупреждающее сообщение. */
        this.validationInfo.isValid = false;
        this.validationInfo.invalidMessage = msg;
      } else {
        /* Изменяет конфигурационный объект, чтобы скрыть предупреждающее сообщение. */
        this.validationInfo.isValid = true;
        this.validationInfo.invalidMessage = "";
      }
      /* Вызывает логику отображения предупреждающего сообщения. */
      this.setMarkOut();
    },
  });
});
