using Newtonsoft.Json;

namespace Travel_Ginie_App.Server.HotelDtos
{
    public class ReviewsPerRating
    {
        [JsonProperty("1")]
        public int _1 { get; set; }

        [JsonProperty("2")]
        public int _2 { get; set; }

        [JsonProperty("3")]
        public int _3 { get; set; }

        [JsonProperty("4")]
        public int _4 { get; set; }

        [JsonProperty("5")]
        public int _5 { get; set; }
    }
}
