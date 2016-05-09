describe("A test harness suite", function() {
 
  var utilities;
  
  beforeEach(function() {
    //utilities = DESVALORIZA.utilities;
	
  });

  it("Validates the combo sort.", function() {
	a = 'A';
	b = 'B';
	c = 'C';
	d = 'D';
    
	data = {"Marcas":[
				{"id": "4", "name": "D"},
				{"id": "2", "name": "B"},
				{"id": "3", "name": "C"},
				{"id": "1", "name": "A"}
			]}
    
	DESVALORIZA.utilities.sort_json(data.Marcas);
		
	//expect(utilities.name).toEqual(data.name);
	//expect(null).toBeNull(); 
	//expect(a).not.toBeNull();
	//expect(b).toMatch("B");
	expect(data).not.toBeNull();
	expect(data.Marcas[0].name).toMatch("A");
	expect(data.Marcas[1].name).toMatch("B");
	expect(data.Marcas[2].name).toMatch("C");
	expect(data.Marcas[3].name).toMatch("D");
	
	
  });
  

  
});