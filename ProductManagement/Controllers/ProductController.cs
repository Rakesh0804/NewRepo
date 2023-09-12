using Domain.Entities;
using Domain.Models;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using static Azure.Core.HttpHeader;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManagement.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly IProductService _productService;
        public static IWebHostEnvironment _environment;
        public ProductController(ILogger<InventoryController> logger, IProductService productService, IWebHostEnvironment environment)
        {
            _logger = logger;
            _productService = productService;
            _environment = environment;
        }

        // GET: <ProductController>/<action>
        [HttpGet]
        public async Task<List<ProductModel>> Get()
        {
            return await _productService.getProduct();
        }

        // GET <ProductController>/<action>/5
        [HttpGet("{id}")]
        public async Task<ProductModel?> Get(int id)
        {
            return await _productService.getProductById(id);
        }

        // POST <ProductController>/<action>
        [HttpPost]
        public async Task<ResponceModel> Post([FromBody] Product product_dto)
        {
            return await _productService.addProduct(product_dto);
        }

        // PUT <ProductController>/<action>/5
        [HttpPut("{id}")]
        public async Task<ResponceModel> Put(int id, [FromBody] Product product_dto)
        {
            return await _productService.updateProduct(product_dto);
        }

        // DELETE <ProductController>/<action>/5
        [HttpDelete("{id}")]
        public async Task<ResponceModel> Delete(int id)
        {
            return await (_productService.deleteProduct(id));
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<FileUploadResponceModel> UploadImage([FromForm] IFormFile? file)
        {
            try
            {
                string webRootPath = _environment.WebRootPath;
                
                string ImgExtension = Path.GetExtension(file.FileName);
                Guid id = Guid.NewGuid();
                string uniqueName = "img_" + id.ToString() + ImgExtension;

                var folderName = Path.Combine(_environment.WebRootPath, "images/");
                if (!Directory.Exists(folderName))
                    Directory.CreateDirectory(folderName);
                string fileupload = folderName + uniqueName;
                if (file.Length > 0)
                {
                    using (var stream = new FileStream(fileupload, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    var result = new FileUploadResponceModel
                    {
                        message = "Upload successful",
                        fileName = uniqueName
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("{searchText}")]
        public async Task<List<ProductModel>> search(string searchText)
        {
            return await _productService.searchProduct(searchText);
        }
    }
}
