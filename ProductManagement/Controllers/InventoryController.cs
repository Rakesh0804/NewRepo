using Domain.Entities;
using Domain.Models;
using Infrastructure.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductManagement.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ILogger<InventoryController> _logger;
        private readonly IInventoryService _inventoryService;

        public InventoryController(ILogger<InventoryController> logger, IInventoryService inventoryService)
        { 
            _logger = logger;
            _inventoryService = inventoryService;
        }

        // GET: <InventoryController>/<action>
        [HttpGet]
        public async Task<List<InventoryModel>> Get()
        {
            return await _inventoryService.getInventory();
        }

        // GET <InventoryController>/<action>/5
        [HttpGet("{id}")]
        public async Task<InventoryModel?> Get(int id)
        {
            return await _inventoryService.getInventoryById(id);
        }

        // POST <InventoryController>/<action>
        [HttpPost]
        public async Task<ResponceModel> Post([FromBody] Inventory value)
        {
            return await _inventoryService.addInventory(value);
        }

        // PUT <InventoryController>/<action>/5
        [HttpPut("{id}")]
        public async Task<ResponceModel> Put(int id, [FromBody] Inventory value)
        {
            return await _inventoryService.updateInventory(value);
        }

        // DELETE <InventoryController>/<action>/5
        [HttpDelete("{id}")]
        public async Task<ResponceModel> Delete(int id)
        {
            return await _inventoryService.deleteInventoryById(id);
        }
    }
}
