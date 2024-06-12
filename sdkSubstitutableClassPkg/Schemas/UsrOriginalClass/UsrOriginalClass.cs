namespace Terrasoft.Configuration
{
    public class UsrOriginalClass
    {
        /* GetAmount() — виртуальный метод, который имеет свою реализацию и может быть переопределен в наследниках. */
        public virtual int GetAmount(int originalValue1, int originalValue2)
        {
            return originalValue1 + originalValue2;
        }
    }
}