using Microsoft.AspNetCore.Mvc;
using System.Net;
using Travel_Ginie_App.Server.Services;
using Travel_Ginie_App.Server.Services.YelpAPI;
using Travel_Ginie_App.Server.ViewModels.Hotel;

namespace Travel_Ginie_App.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TravelAppController : ControllerBase
	{
		private readonly ITravelApp _travelApp;
		private readonly IYelpApiReader _yelpApiReader;

		public TravelAppController(ITravelApp travelApp, IYelpApiReader yelpApiReader)
		{
			_travelApp = travelApp;
			_yelpApiReader = yelpApiReader;
		}

		[HttpGet]
		[Route("Countries")]

		public async Task<IActionResult> GetCountries()
		{
			try
			{
				var result = await _travelApp.GetCountryNames();

				return Ok(result);
			}
			catch (Exception ex)
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
		public async Task<IActionResult> GetEventsByCity(string type, string city)
		{
			try
			{
				var events = await _travelApp.GetEvents(type, city);
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
				var restaurants = await _travelApp.GetTravelPlan(day, city);
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
				var tripplan = await _travelApp.GetPlanDetail(country, city, startdate, enddate, companion, budjet, numberofppl, activity);
				return Ok(tripplan);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error retrieving cities: {ex.Message}");
			}
		}


		/// <summary>
		/// Get hotel by location and max budget
		/// </summary>
		/// <param name="location">Location for the hotel</param>
		/// <param name="checkIn">Check in date</param>
		/// <param name="checkOut">Check out date</param>
		/// <param name="currencyCode">Code for currency</param>
		/// <param name="maxBudget">Max budget</param>
		/// <returns></returns>
		[HttpGet("HotelByBudget")]
		[Tags("Hotels")]
		[ProducesResponseType(typeof(List<HotelBudgetViewModel>), 200)]
		[ProducesResponseType(500)]
		public async Task<ActionResult<List<HotelBudgetViewModel>>> GetAllHotelByBudget(
			string location,
			string checkIn,
			string checkOut,
			string currencyCode,
			string maxBudget)
		{
			try
			{
				var hotel = await _travelApp.HotelsByBudget(location, checkIn, checkOut, currencyCode, maxBudget);

				return Ok(hotel);
			}
			catch (Exception ex)
			{

				throw;
			}
		}




		/// <summary>
		/// Get restaurant by location and max budget
		/// </summary>
		/// <param name="location">Location for the restaurant</param>
		/// <param name="price">Price range ($ = 1, $$ = 2, $$$ = 3, $$$$ = 4) </param>
		/// <param name="numberResultPage">Number of result</param>
		/// <returns></returns>
		[HttpGet("RestaurantByCityAndBudget")]
		[Tags("Restaurants")]
		[ProducesResponseType(typeof(List<HotelBudgetViewModel>), 200)]
		[ProducesResponseType(500)]
		[ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
		[ProducesDefaultResponseType]
		public async Task<ActionResult<List<HotelBudgetViewModel>>> GetByRestaurantByCityAndBudget(
			string location,
			int price,
			int numberResultPage)
		{

			try
			{
				var hotel = await _yelpApiReader.RestaurantsByCityAndBudget(location, price, numberResultPage);

				return Ok(hotel);
			}
			catch (HttpRequestException ex)
			{

				if (ex.StatusCode == HttpStatusCode.BadRequest)
				{
					return BadRequest("No location with that name");
				}

				throw;
			}

		}


	}
}
