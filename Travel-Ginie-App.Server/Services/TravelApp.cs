using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Travel_Ginie_App.Server.AIResponseDTO;
using Travel_Ginie_App.Server.Dtos;
using Travel_Ginie_App.Server.EventDto;
using Travel_Ginie_App.Server.TripPlanDto;
using JsonException = Newtonsoft.Json.JsonException; 

namespace Travel_Ginie_App.Server.Services
{
    public class TravelApp : ITravelApp
    {
        public async Task<List<object>> GetEvents(string type, string city)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://real-time-events-search.p.rapidapi.com/search-events?query={type}%20in%20{city}&date=next_week&start=0";

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "real-time-events-search.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    var eventDetail = JsonConvert.DeserializeObject<EventDto.Root>(jsonResponse);

                    var result = eventDetail.data
                      
                   
                        .Select(datum => new
                        {
                            EventName = datum.name,
                            EventDiscription=datum.description,
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

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
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

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
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
        public Task<List<string>> GetAttractions(string city)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetHotelDetails(string location)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetRestaurants(string city)
        {
            try
            {

                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/auto-complete?text={city}";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "the-fork-the-spoon.p.rapidapi.com");

                    var responce= await client.GetAsync(apiUrl);    

                    responce.EnsureSuccessStatusCode();

                    return await responce.Content.ReadAsStringAsync();
                }

            }catch (HttpRequestException ex)
            {
                throw new NotImplementedException("couldnt connect",ex);
            }
           
        }

        public async Task<TripPlan> GetTravelPlan(string day, string city)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    string apiUrl = $"https://ai-trip-planner.p.rapidapi.com/?days={day}&destination={city}";
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "ai-trip-planner.p.rapidapi.com");

                    var response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();
                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<TripPlan>(jsonResponse);

                    return result;
                }
            }
            catch (HttpRequestException ex)
            {
                throw new NotImplementedException("Couldn't connect to the server", ex);
            }
        }

        public async Task<AiTripPlanDTO> GetPlanDetail(string country, string city, DateTime startdate, DateTime enddate, string companion, decimal budjet, int numberofppl, string[] activity)
        {
            var nuberofdays = startdate - enddate;

            try
            {
                var conversation = new[] { new
        {
            content = $"generate a trip plan in {country}{city} for {nuberofdays} days traveling with {companion} for {numberofppl} people wishing to perform {string.Join(", ", activity)} activities and have a budget of {budjet} dollars.",
            role = "user"
        }
         };

                using (var client = new HttpClient())
                {
                    string apiUrl = "https://chatgpt-api8.p.rapidapi.com/";

                    client.DefaultRequestHeaders.Add("X-RapidAPI-Key", "954eeaa13amsh4309e7a17a3d7a0p1370e5jsnb111604275a3");
                    client.DefaultRequestHeaders.Add("X-RapidAPI-Host", "chatgpt-api8.p.rapidapi.com");


                    var jsonContent = JsonConvert.SerializeObject(conversation);

                    var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync(apiUrl, content);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonResponse = await response.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<AiTripPlanDTO>(jsonResponse);
                    }
                    else
                    {
                        return new AiTripPlanDTO { Text = $"Error: {response.StatusCode}" };
                    }
                }
            }
            catch (HttpRequestException ex)
            {
                return new AiTripPlanDTO { Text = $"HTTP Request Error: {ex.Message}" };
            }
            catch (Exception ex)
            {
                return new AiTripPlanDTO { Text = $"Error: {ex.Message}" };
            }
        }


    }


}

