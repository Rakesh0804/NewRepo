using Domain.Entities;
using Domain.Models;
using Infrastructure.Services;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManagement.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly ICategoryService _categoryService;

        public CategoryController(ILogger<CategoryController> logger, ICategoryService categoryService)
        {
            _logger = logger;
            _categoryService = categoryService;
        }
        
        // GET: <CategoryController>/<action>
        [HttpGet]
        public async Task<List<Category>> Get()
        {
            return await _categoryService.getCategory();
        }

        // GET <CategoryController>/<action>/5
        [HttpGet("{id}")]
        public async Task<Category> Get(int id)
        {
            return await _categoryService.getCategoryById(id);
        }

        // POST <CategoryController>/<action>/
        [HttpPost]
        public async Task<ResponceModel> Post([FromBody] Category category_dto)
        {
            return await _categoryService.addCategory(category_dto);
        }

        // PUT <CategoryController>/<action>/5
        [HttpPut("{id}")]
        public async Task<ResponceModel> Put(int id, [FromBody] Category category_dto)
        {
            return await _categoryService.updateCategory(category_dto);
        }

        // DELETE <CategoryController>/<action>/5
        [HttpDelete("{id}")]
        public async Task<ResponceModel> Delete(int id)
        {
            return await _categoryService.deleteCategoryById(id);
        }

        [HttpGet]
        public async Task<List<CategoryModel>> GetCategoryNameId()
        {
            return await _categoryService.getCategoryIdName();
        }
    }
}
