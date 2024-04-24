namespace Travel_Ginie_App.Server.AttractionsDto
{
    public class Product
    {
        public string id { get; set; }
        public string __typename { get; set; }
        public string title { get; set; }
        public string productId { get; set; }
        public string productSlug { get; set; }
        public string taxonomySlug { get; set; }
        public int cityUfi { get; set; }
        public string cityName { get; set; }
        public string countryCode { get; set; }
    }
}
