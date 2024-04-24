using Newtonsoft.Json;

namespace Travel_Ginie_App.Server.Dtos
{
    public class CountriesDto
    {
        public int success { get; set; }

        [JsonProperty("0")]
        public List<CountryDto> countries { get; set; }
    }
}
