
// Sample data from the External Tariff Provider
const tariffData = [
    { "name": "Product A", "type": 1, "baseCost": 5, "additionalKwhCost": 22 },
    { "name": "Product B", "type": 2, "includedKwh": 4000, "baseCost": 800, "additionalKwhCost": 30 },
  ];

const TariffCalculation = (req, res) => {
    try{
        
        const { consumption } = req.body;

        const results = [];
    
        tariffData.forEach((tariff) => {
            let annualCost = 0;
    
            if (tariff.type === 1) {
                annualCost = tariff.baseCost * 12 + consumption * (tariff.additionalKwhCost / 100);
            } else if (tariff.type === 2) {
                if (consumption <= tariff.includedKwh) {
                    annualCost = tariff.baseCost;
                } else {
                    const additionalConsumption = consumption - tariff.includedKwh;
                    annualCost = tariff.baseCost + additionalConsumption * (tariff.additionalKwhCost / 100);
                }
            }
    
            results.push({ name: tariff.name, annualCost });
        });
    
        res.json(results);
    } catch(error){
        res.json({"message":"Internal Failure"});
    }

};

module.exports = {
    TariffCalculation: TariffCalculation
}