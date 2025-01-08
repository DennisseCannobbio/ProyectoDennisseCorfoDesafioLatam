const request = require('supertest');
const app = require('../src/index');

jest.mock("../src/controllers/menus.js", () => {
  return {
    getMenus: jest.fn(() => Promise.resolve([])),
    getMenuById: jest.fn(() => Promise.resolve([])) 
  }
})

describe("GET api/menus", () => {

  it("GET api/menus Should return status code 200", async () => {
    const { statusCode} = await request(app).get("/api/menus");
    expect(statusCode).toBe(200)
  })

  it("GET /api/menus Should return menus array with data", async () => {
    const mockMenus = [
      { id: 1, name: "Menu 1", description: "Soup with potatoes" },
      { id: 2, name: "Menu 2", description: "Salad" }
    ];
    require("../src/controllers/menus.js").getMenus.mockResolvedValue(mockMenus);
    
    const { statusCode, body } = await request(app).get("/api/menus");
    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0); 
    expect(body).toEqual(mockMenus); 
  });

  it("GET /api/menus Should return 404 if not found", async () => {
    const { statusCode } = await request(app).get("/wrong/route");
    expect(statusCode).toBe(404);
  });
})

describe("GET /api/menus/:id", () => {

  it("GET /api/menus/:id Should return a specific menu", async () => {
    const mockMenu = { id: 1, name: "Menu 1", description: "Soup with potatoes" };
    require("../src/controllers/menus.js").getMenuById.mockResolvedValue(mockMenu);
    
    const { statusCode, body } = await request(app).get("/api/menus/1");
    expect(statusCode).toBe(200);
    expect(body).toEqual(mockMenu);
  });

  it("GET /api/menus/:id Should return 404 if menu not found", async () => {
    require("../src/controllers/menus.js").getMenuById.mockResolvedValue(null);
    
    const { statusCode, body } = await request(app).get("/api/menus/999"); 
    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Menu not found" });
  });
});