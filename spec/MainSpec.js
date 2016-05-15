describe("A test harness suite", function() {
 
  //var utilities;
  
  beforeEach(function() {
    //utilities = DESVALORIZA.utilities;
	//DESVALORIZA.makers.install();
	
  });

  xit("Validates the combo sort.", function() {
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
		
	expect(data).not.toBeNull();
	expect(data.Marcas[0].name).toEqual("A");
	expect(data.Marcas[1].name).toEqual("B");
	expect(data.Marcas[2].name).toEqual("C");
	expect(data.Marcas[3].name).toEqual("D");
	
	expect(data.Marcas[3].name).not.toEqual("A");
	
	
  });
  
  it("Validates an specific data value", function() {
    //the text content of the selected option
	//$("#elementId :selected").text()  
	
	//the value of the selected option
	//$("#elementId").val() 
	var makersName = 'a';
	var makerID; 	
	
	//DESVALORIZA.makers.install();
	
	//makerIDSet = $(DESVALORIZA.makers.select_id).val("44");
	//console.log((DESVALORIZA.makers.select_id).val());
	
	//makersName = $("#maker :selected").text();	
	
    expect(makersName).not.toBe(null);
    //expect(a).not.toBe(null);
  });
  
});