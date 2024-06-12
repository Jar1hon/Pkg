namespace Terrasoft.Configuration
{
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core;
    using Terrasoft.Web.Common;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrAmountService : BaseService
    {

        [OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
        public string GetAmount(int value1, int value2) {
            /*
            // Создание экземпляра исходного класса через фабрику классов.
            var originalObject = Terrasoft.Core.Factories.ClassFactory.Get<UsrOriginalClass>();

            // Получение результата работы метода GetAmount(). В качестве параметров передаются значения из полей ввода страницы.
            int result = originalObject.GetAmount(value1, value2);

            // Отображение на странице результата выполнения.
            return string.Format("The result value, retrieved after calling the replacement class method: {0}", result.ToString());
            */

            /*
            // Создание экземпляра замещающего класса через фабрику замещаемых объектов.
            // В качестве параметра метода фабрики передается экземпляр аргумента конструктора класса.
            var substObject = Terrasoft.Core.Factories.ClassFactory.Get<UsrOriginalClass>(new Terrasoft.Core.Factories.ConstructorArgument("rateValue", 2));

            // Получение результата работы метода GetAmount(). В качестве параметров передаются значения из полей ввода страницы.
            int result = substObject.GetAmount(value1, value2);

            // Отображение на странице результата выполнения.
            return string.Format("The result value, retrieved after calling the replaceable class method: {0}", result.ToString());
            */

            /* Создание экземпляра замещающего класса через оператор new(). */
            var substObjectByNew = new UsrOriginalClass();

            /* Создание экземпляра замещающего класса через фабрику замещаемых объектов. */
            var substObjectByFactory = Terrasoft.Core.Factories.ClassFactory.Get<UsrOriginalClass>(new Terrasoft.Core.Factories.ConstructorArgument("rateValue", 2));

            /* Получение результата работы метода GetAmount(). Будет вызван метод исходного класса UsrOriginalClass без замещения. */
            int resultByNew = substObjectByNew.GetAmount(value1, value2);

            /* Получение результата работы метода GetAmount(). Будет вызван метод класса UsrSubstituteClass, который замещает UsrOriginalClass. */
            int resultByFactory = substObjectByFactory.GetAmount(value1, value2);

            /* Отображение на странице результата выполнения. */
            return string.Format("Result without class replacement: {0}; Result with class replacement: {1}", resultByNew.ToString(), resultByFactory.ToString());
        }
    }
}