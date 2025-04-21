import { SprayCalculatorSchema } from "@/app/schemas";
import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";

type SprayCalculatorForm = z.infer<typeof SprayCalculatorSchema>;

export default function Calculations({
    form,
}: {
    form: UseFormReturn<SprayCalculatorForm>;
}) {
    function totalCal(results: any) {
        const [
            referencePressure,
            referenceNozzleCapacity,
            forwardSpeed,
            waterVolume,
            nozzleSpacing,
            area,
            items=[],
        ] = results;
    
        let totalProductVolume = 0;
        const productVolumes: { id: string; name: string; volume: number }[] = [];
    
        for (const item of items) {
            const productVolume = item.applicationRate * area;
            totalProductVolume += item.applicationRate;
            
            productVolumes.push({
                id: item.itemId?.value?.toString() ?? "unknown-id",
                name: item.itemId?.label ?? "Unnamed Product",
                volume: parseFloat(productVolume.toFixed(2)),
            });
        }      
    
        const sprayVolume = waterVolume + totalProductVolume;
    
        const nozzleOutput = (sprayVolume * forwardSpeed * nozzleSpacing) / 600;
        const nozzleOutputNumber = parseFloat(nozzleOutput.toFixed(2));
    
        const newPressure =
            referencePressure * (nozzleOutput / referenceNozzleCapacity) ** 2;
        const newPressureNumber = parseFloat(newPressure.toFixed(2));
    
        const totalVolume = sprayVolume * area;
        const totalVolumeNumber = parseFloat(totalVolume.toFixed(2));
    
        return {
            nozzleOutput: nozzleOutputNumber,
            newPressure: newPressureNumber,
            totalVolume: totalVolumeNumber,
            productVolumes,
        };
    }
    

    const results = useWatch({
        control: form.control,
        name: [
            "referencePressure",
            "referenceNozzleCapacity",
            "forwardSpeed",
            "waterVolume",
            "nozzleSpacing",
            "area",
            "items",
        ],
    });
    const output = totalCal(results);

    return (
        <div>
            {!output ? (
                <p>Fill out the form to see spray calculations.</p>
            ) : isNaN(output.nozzleOutput) ||
              isNaN(output.newPressure) ||
              isNaN(output.totalVolume) ? (
                <p>Enter valid values to calculate spray output.</p>
            ) : (
                <ul>
                    <li>
                        <strong>Nozzle Output:</strong> {output.nozzleOutput} L/min
                    </li>
                    <li>
                        <strong>Pressure:</strong> {output.newPressure} bar
                    </li>
                    <li>
                        <strong>Total Volume:</strong> {output.totalVolume} L
                    </li>
                </ul>
            )}
    
            {output?.productVolumes?.length > 0 && !isNaN(output.totalVolume) && (
                <div>
                    <p><strong>Product Volumes:</strong></p>
                    <ul>
                        {output.productVolumes.map((product) => (
                            <li key={product.id}>
                                {product.name}: {product.volume} L
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    
    
    
}
