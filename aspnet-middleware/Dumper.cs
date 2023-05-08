using Newtonsoft.Json;

namespace aspnet_middleware
{
    public static class Dumper
    {

        public static void Dump(object obj)
        {
            System.Console.WriteLine(JsonConvert.SerializeObject(obj));
        }

    }

}
