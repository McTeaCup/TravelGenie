using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel_Ginie_App.Server.Services;

namespace Travel_Ginie_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelAppController : ControllerBase
    {
        private readonly ITravelApp _travelApp;

        public TravelAppController(ITravelApp travelApp)
        {
            _travelApp = travelApp;
        }

        [HttpGet]
        [Route("Countries")]

        public async Task<IActionResult> GetCountries()
        {
            try
            {
                var result = await _travelApp.GetCountryNames();

                return Ok(result);
            }catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
           
        }

        [HttpGet]
        [Route("Cities")]
        public async Task<IActionResult> GetCities(string country)
        {
            try
            {
                var cities = await _travelApp.GetCities(country);
                return Ok(cities);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("events")]
        public async Task<IActionResult> GetEventsByCity(string type,string city)
        {
            try
            {
                var events = await _travelApp.GetEvents(type,city);
                return Ok(events);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("Restaurants")]
        public async Task<IActionResult> GetRestaurantsByCity(string city)
        {
            try
            {
                var restaurants = await _travelApp.GetRestaurants(city);
                return Ok(restaurants);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("tripplan")]
        public async Task<IActionResult> GeTripPlan(string day, string city)
        {
            try
            {
                var restaurants = await _travelApp.GetTravelPlan(day,city);
                return Ok(restaurants);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AItripplan")]
        public async Task<IActionResult> GeTripPlanDetail(string country, string city, DateTime startdate, DateTime enddate, string companion, decimal budjet, int numberofppl, string[] activity)
        {
            try
            {
                var tripplan = await _travelApp.GetPlanDetail(country,city,startdate,enddate,companion,budjet,numberofppl,activity);
                return Ok(tripplan);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving cities: {ex.Message}");
            }
        }



    }
}
 