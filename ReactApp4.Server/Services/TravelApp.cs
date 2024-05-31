
using Newtonsoft.Json;

using System.Text;

using Travel_Ginie_App.Server.Dtos;

using Travel_Ginie_App.Server.GeoIdDto;




namespace Travel_Ginie_App.Server.Services
{
    public class TravelApp : ITravelApp
    {
        private readonly IConfiguration _configuration;


        public TravelApp(IConfiguration configuration)
        {
            _configuration = configuration;


        }
        //displays all events in the selected city
        public async Task<List<object>> GetEvents(string type, string city, int start)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://real-time-events-search.p.rapidapi.com/search-events?query={type}%20in%20{city}&start={start}";

                    client.DefaultRequestHeaders.Add("X - RapidAPI - Key", _configuration["ApiKeys:EventsByCityApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "real-time-events-search.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    var eventDetail = JsonConvert.DeserializeObject<EventDto.Root>(jsonResponse);

                    var result = eventDetail.data
                       .Where(datum => !string.IsNullOrEmpty(datum.thumbnail))
                        .Select(datum => new
                        {
                            EventName = datum.name,
                            EventDescription = datum.description,
                            Venue = datum.venue.name,
                            VenueCity = datum.venue.city,
                            VenueAddress = datum.venue.full_address,
                            StartTime = datum.start_time,
                            EndTime = datum.end_time,
                            TicketLink = datum.ticket_links,
                            Thumbnail = datum.thumbnail
                        })
                        .ToList<object>();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Could not connect to server", ex);
            }
        }

        public async Task<List<string>> GetCities(string country)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://world-citiies-api.p.rapidapi.com/cities/country/{country}";


                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", _configuration["ApiKeys:CityListApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "world-citiies-api.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    var cityNames = JsonConvert.DeserializeObject<List<CitiesDto>>(jsonResponse)

                        .Select(c => c.Name).OrderBy(city => city)
                        .ToList();

                    return cityNames;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Could not connect to server", ex);
            }
        }

        public async Task<List<string>> GetCountryNames()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://city-list.p.rapidapi.com/api/getCountryList";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", _configuration["ApiKeys:CountryListApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "city-list.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();


                    var result = JsonConvert.DeserializeObject<CountriesDto>(jsonResponse);


                    var countryNames = result?.countries?.Select(c => c.cname)?.ToList();


                    return countryNames;
                }
            }
            catch (HttpRequestException ex)
            {
                throw new Exception("Could not connect to server", ex);
            }
        }



        public async Task<List<HotelDtos.Data>> GetHotelDetails(string city, DateTime checkin, DateTime checkout)
        {
            try
            {
                int geoId = await GetGeoId(city);

                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId={geoId}&checkIn={checkin:yyyy-MM-dd}&checkOut={checkout:yyyy-MM-dd}&pageNumber=1&currencyCode=USD";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", _configuration["ApiKeys:HotelListApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<HotelDtos.Root>(jsonResponse);

                    // Select only the required properties
                    var hotelSummaries = result.data.data.Select(hotel => new HotelDtos.Data
                    {
                        sortDisclaimer = hotel.sortDisclaimer,
                        data = hotel.data,
                        id = hotel.id,
                        title = hotel.title,
                        primaryInfo = hotel.primaryInfo,
                        secondaryInfo = hotel.secondaryInfo,
                        badge = hotel.badge,
                        bubbleRating = hotel.bubbleRating,
                        isSponsored = hotel.isSponsored,
                        accentedLabel = hotel.accentedLabel,
                        provider = hotel.provider,
                        priceForDisplay = hotel.priceForDisplay,
                        strikethroughPrice = hotel.strikethroughPrice,
                        priceDetails = hotel.priceDetails,
                        priceSummary = hotel.priceSummary,


                        cardPhotos = hotel.cardPhotos.Select(photo => new HotelDtos.CardPhoto
                        {
                            __typename = photo.__typename,

                            sizes = new HotelDtos.Sizes
                            {
                                urlTemplate = photo.sizes.urlTemplate,
                                __typename = photo.sizes.__typename,
                                maxHeight = photo.sizes.maxHeight,
                                maxWidth = photo.sizes.maxWidth,


                            }
                        }).ToList(),
                        commerceInfo = hotel.commerceInfo,

                    }).ToList();
                    return hotelSummaries;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Data not found", ex);
            }
        }



        public async Task<List<RestaurantsDto.RestaurantsDto>> GetRestaurants(string city)
        {
            try
            {
                int geoId = await GetGeoId(city);

                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId={geoId}";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", _configuration["ApiKeys:RestaurantListApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();
                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<RestaurantsDto.RestaurantsDto>(jsonResponse);

                    var selectedRestaurants = result.data.data


                        .Select(restaurant => new RestaurantsDto.RestaurantsDto

                        {

                            data = new RestaurantsDto.Data
                            {
                                name = restaurant.name,
                                userReviewCount = restaurant.userReviewCount,
                                currentOpenStatusText = restaurant.currentOpenStatusText,
                                priceTag = restaurant.priceTag,
                                averageRating = restaurant.averageRating,
                                establishmentTypeAndCuisineTags = restaurant.establishmentTypeAndCuisineTags,
                                squareImgUrl = restaurant.squareImgUrl,
                                squareImgRawLength = restaurant.squareImgRawLength


                            }



                        }).ToList();


                    return selectedRestaurants;
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Could not connect to server", ex);

            }
        }



        public async Task<TripPlanDto.TripPlan> GetTravelPlan(string day, string city, string activities, int numberofppl, decimal budjet, string companions)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://ai-trip-planner.p.rapidapi.com/?days={day}&destination={city}&activity{activities}&numburofppl{numberofppl}&budjet{budjet}&{companions}";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", _configuration["ApiKeys:AiTripPlannerApiKey"]);
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "ai-trip-planner.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonrespopns = await response.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<TripPlanDto.TripPlan>(jsonrespopns);

                    return result;




                }
            }
            catch (HttpRequestException ex)
            {
                throw new NotImplementedException("Couldn't connect to the server", ex);
            }
        }



        public async Task<int> GetGeoId(string city)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query={city}";

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "d7e9322450msh50722105539f988p17a776jsn08e2a7b82309");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "tripadvisor16.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<GeoInfo>(jsonResponse);

                    var geoInfo = result.data.Select(c => c.geoId);


                    return geoInfo.FirstOrDefault();
                }
            }
            catch (HttpRequestException ex)
            {

                Console.WriteLine($"Request error: {ex.Message}");

                throw;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error: {ex.Message}");

                throw;
            }
        }

        public async Task<string> GetCategories()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = "https://api.yelp.com/v3/categories?locale=en_AU";
                    client.DefaultRequestHeaders.Add("accept", "application/json");
                    client.DefaultRequestHeaders.Add("Authorization", "Bearer 2AL66qx6IMSRm8GHXym-SarecDwICgtdCeJd0f6lKeSqeygyBgA02_h4D9AOTxk0WrGQeblSafrb03dGZm6fvGVnCwDiDvAnJx5aFk5M_9uJ2XsIBrLQScZueJg8ZnYx");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    return await response.Content.ReadAsStringAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching categories.", ex);
            }
        }

        public async Task<TripPlan> GetPlanDetail(string prompt)
        {
            try
            {
                var conversation = new[]
                {
                    new
                    {
                        content = $"{prompt}",
                        role = "user"
                    }
                };

                using (var client = new HttpClient())
                {
                    string apiUrl = "https://chatgpt-api8.p.rapidapi.com/";

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "d7e9322450msh50722105539f988p17a776jsn08e2a7b82309");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "chatgpt-api8.p.rapidapi.com");

                    var jsonContent = JsonConvert.SerializeObject(conversation);
                    var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                    using (var response = await client.PostAsync(apiUrl, content))
                    {
                        response.EnsureSuccessStatusCode();

                        var jsonResponse = await response.Content.ReadAsStringAsync();

                        var responseObject = JsonConvert.DeserializeObject<TripPlan>(jsonResponse);

                        var result = new TripPlan
                        {
                            dayPlans = responseObject.dayPlans,
                            text = responseObject.text,
                        };



                        return responseObject;
                    }
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"HTTP Request Error: {ex.Message}");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null;
            }
        }


    }
}