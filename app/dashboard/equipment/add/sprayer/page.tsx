import AddSprayerForm from "./add-sprayer-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AddSprayerPage() {
    return (
        <div className="grid max-w-full-lg gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sprayer Details</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing
                                elit
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <AddSprayerForm />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
