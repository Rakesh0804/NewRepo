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
    public class SubCategoryController : ControllerBase
    {
        private readonly ILogger<SubCategoryController> _logger;
        private readonly ISubCategoryService _subCategoryService;

        public SubCategoryController(ILogger<SubCategoryController> logger, ISubCategoryService subCategoryService)
        {
            _logger = logger;
            _subCategoryService = subCategoryService;
        }

        // GET: <SubCategoryController>
        [HttpGet]
        public async Task<List<SubCategory>> Get()
        {
            return await _subCategoryService.getSubCategory();
        }

        // GET <SubCategoryController>/<action>/5
        [HttpGet("{id}")]
        public async Task<SubCategory> Get(int id)
        {
            return await _subCategoryService.getSubCategoryById(id);
        }

        // POST <SubCategoryController>/<action>
        [HttpPost]
        public async Task<ResponceModel> Post([FromBody] SubCategory subcategory_dto)
        {
            return await _subCategoryService.addSubCategory(subcategory_dto);
        }

        // PUT <SubCategoryController>/<action>/5
        [HttpPut("{id}")]
        public async Task<ResponceModel> Put(int id, [FromBody] SubCategory subcategory_dto)
        {
            return await _subCategoryService.updateSubCategory(subcategory_dto);
        }

        // DELETE <SubCategoryController>/<action>/5
        [HttpDelete("{id}")]
        public async Task<ResponceModel> Delete(int id)
        {
            return await _subCategoryService.deleteSubCategoryById(id);
        }

        [HttpGet("{id}")]
        //SubCategory/getSubCategoryIdNameByCategogyId/5
        public async Task<List<SubCategoryModel>> getSubCategoryIdNameByCategogyId([FromRoute]int id)
        {
            return await _subCategoryService.getSubCategoryIdNameByCategogyId(id);
        }
    }
}
