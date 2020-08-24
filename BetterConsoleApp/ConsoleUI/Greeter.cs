namespace ConsoleUI
{
    public class Greeter
    {
        private readonly IGreetingService _greetingService;

        public Greeter(IGreetingService greetingService)
        {
            _greetingService = greetingService;
        }

        public void Greet()
        {
            _greetingService.Run();
        }
    }
}
