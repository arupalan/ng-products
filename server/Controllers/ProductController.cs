using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TestApi.Dto;
using TestApi.Helper;
using System.Linq;

namespace TestApi.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        [Route("~/v1/products")]
        public ActionResult<IList<Product>> GetProducts()
        {
            return DataStore.GetProducts().OrderByDescending( p => p.Id).ToList();

        }
        
    }
}
