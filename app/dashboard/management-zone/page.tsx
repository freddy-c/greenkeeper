"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function ManagementZonePage() {
    return (
        <div>
            <h1>Management Zone</h1>
            <div style={{ height: "100vh", width: "100%" }}>
                <APIProvider
                    apiKey={
                        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
                    }
                >
                    <Map
                        defaultCenter={{ lat: 51.155047, lng: 0.377784 }}
                        defaultZoom={13}
                        gestureHandling={"greedy"}
                        mapTypeId={"satellite"}

                        // disableDefaultUI={true}
                    />
                </APIProvider>
            </div>
        </div>
    );
}
