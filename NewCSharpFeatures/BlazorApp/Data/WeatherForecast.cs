using System;

namespace BlazorApp.Data
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary
        {
            get
            {
                return this.TemperatureC switch
                {
                    < 0 => "Freezing",
                    < 5 => "Bracing",
                    < 10 => "Chilly",
                    < 15 => "Cool",
                    < 24 => "Mild",
                    < 30 => "Warm",
                    < 34 => "Balmy",
                    < 38 => "Hot",
                    < 40 => "Sweltering",
                    _ => "Scorching"
                };
            }
        }
    }
}
