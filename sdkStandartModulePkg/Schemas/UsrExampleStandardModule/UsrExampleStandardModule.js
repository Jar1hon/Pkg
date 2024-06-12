/* Объявление модуля с именем UsrExampleStandartModule. Модуль не имеет никаких зависимостей, поэтому в качестве второго параметра передается пустой массив. 
Функция-фабрика возвращает объект модуля с двумя методами. */
define("UsrExampleStandardModule", [], function () {
  return {
    /* При загрузке модуля клиентское ядро автоматически вызывает этот метод первым. */
    init: function () {
      alert("Вызов метода init() модуля UsrExampleStandardModule");
    },
    /* При загрузке модуля в контейнер клиентское ядро автоматически вызывает этот метод. Ссылка на контейнер передается в метод в качестве параметра renderTo. В информационном сообщении выводится идентификатор элемента управления страницы, в котором отображаются визуальные данные модуля. По умолчанию — centerPanel. */
    render: function (renderTo) {
      alert(
        "Вызвается метод render() модуля UsrExampleStandardModule. " +
          renderTo.id
      );
    },
  };
});

//http://myserver.com/0/NUI/ViewModule.aspx#UsrExampleStandardModule
