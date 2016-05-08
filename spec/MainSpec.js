describe("A test harness suite", function() {
 
  var utilities;
  
  beforeEach(function() {
    utilities = DESVALORIZA.utilities;
	//main = new Main();
  });

  it("Validates the combo sort.", function() {
	a = 'A';
	b = 'B';
	c = 'C';
	d = 'D';
    
	combo = {"combo":[
				{"id": "4", "name": "D"},
				{"id": "2", "name": "B"},
				{"id": "3", "name": "C"},
				{"id": "1", "name": "A"}
			]}
    
	//utilities.sort_json(combo);
	
	//expect(utilities.name).toEqual(combo.name);
	expect(null).toBeNull(); 
	expect(a).not.toBeNull();
	expect(b).toMatch("B");
	
  });
  
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
  
});