describe("utilities test", function () {

    it("should sort model data.", function () {
        var data = {
            "Marcas": [
                {"id": "4", "name": "D"},
                {"id": "2", "name": "B"},
                {"id": "3", "name": "C"},
                {"id": "1", "name": "A"}
            ]
        };

        DESVALORIZA.utilities.sort_json(data.Marcas);

        expect(data).not.toBeNull();
        expect(data.Marcas[0].name).toEqual("A");
        expect(data.Marcas[1].name).toEqual("B");
        expect(data.Marcas[2].name).toEqual("C");
        expect(data.Marcas[3].name).toEqual("D");

        expect(data.Marcas[3].name).not.toEqual("A");
    });

    it("should append default option", function () {
        var combo = jasmine.createSpyObj("combo", ["append"]);
        DESVALORIZA.utilities.addComboOptions(combo);
        expect(combo.append).toHaveBeenCalled();
    });

});
