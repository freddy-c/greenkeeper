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
            items,
        ] = results;

        let totalProductVolume = 0;

        for (const key in items) {
            totalProductVolume =
                totalProductVolume + results[6][key]["applicationRate"];
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
            {output && <p>Nozzle Output: {output.nozzleOutput} l/ha</p>}
            {output && <p>Pressure: {output.newPressure} bar</p>}
            {output && <p>Total Volume: {output.totalVolume} l</p>}
        </div>
    );
}
