namespace Terrasoft.Configuration
{
    [Terrasoft.Core.Factories.Override]
    public class UsrSubstituteClass : UsrOriginalClass
    {
        /* Коэффициент. Значение свойства задается внутри класса. */
        public int Rate { get; private set; }
        
        /* В конструкторе выполняется первичная инициализация свойства Rate переданным значением. */
        public UsrSubstituteClass(int rateValue)
        {
            Rate = rateValue;
        }

        /* Замещение родительского метода пользовательской реализацией. */
        public override int GetAmount(int substValue1, int substValue2)
        {
            return (substValue1 + substValue2) * Rate;
        }
    }
}