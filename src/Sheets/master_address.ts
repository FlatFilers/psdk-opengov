/*
Assumptions made while creating this sheet:
1. We received the Mapping Template file, which had all keys within []. We removed those from the keys of each field.
2. We received the keys of each field, but not the label. Every label defined in this sheet is an assumption of what labels are supposed to be.
3. All fields are marked as TextField, except where we determined with 100% confidence the field is of other type (based on received sample data).
4. MAT Mapping Template file states that gisID should be required if GIS Flags. We need more context on this. Until then, field is marked as NOT required.
*/

import {
    NumberField,
    Sheet,
    TextField,
    SpaceConfig,
    Workbook
} from '@flatfile/configure'

// This is the key of the sheet
const master_address_sheet = new Sheet(
    // This is the label of the sheet that will be visible in your Flatfile dashboard
    'Master Address',
    {
        // This is the key of the field
        streetNo: NumberField({
            // This is the label of the field that will be visible to a user importing a file.
            label: "Street number",
            // This specifies that the field is required.
            required: true
        }),

        streetName: TextField({
            label: "Street name",
            required: true
        }),

        unit: NumberField({
            label: "Unit"
        }),

        city: TextField({
            label: "City",
            required: true
        }),

        state: TextField({
            label: "State",
            required: true
        }),

        postalCode: NumberField({
            label: "Postal code",
            required: true
        }),

        country: TextField({
            label: "Country"
        }),

        gisID: TextField({
            label: "Gis ID"
        }),

        latitude: TextField({
            label: "Latitude"
        }),

        longitude: TextField({
            label: "Longtitude"
        }),

        yearBuilt: NumberField({
            label: "Year built"
        }),

        mbl: TextField({
            label: "Mbl",
            required: true
        }),

        subdivision: TextField({
            label: "Subdivision",
        }),

        zoning: TextField({
            label: "Zoning"
        }),

        lotArea: TextField({
            label: "Lot area"
        }),

        bookPage: TextField({
            label: "Book page"
        }),

        water: TextField({
            label: "Water"
        }),

        sewage: TextField({
            label: "Sewage"
        }),

        ownerName: TextField({
            label: "Owner name"
        }),

        ownerStreetNo: TextField({
            label: "Owner street number"
        }),

        ownerStreetName: TextField({
            label: "Owner street name"
        }),

        ownerUnit: TextField({
            label: "Owner unit"
        }),

        ownerCity: TextField({
            label: "Owner city"
        }),

        ownerState: TextField({
            label: "Owner state"
        }),

        ownerPostalCode: NumberField({
            label: "Owner postal code"
        }),

        ownerCountry: TextField({
            label: "Owner country"
        }),

        ownerPhoneNo: TextField({
            label: "Owner phone number"
        }),

        ownerEmail: TextField({
            label: "Owner email"
        }),

        occupancyType: NumberField({
            label: "Occupancy type"
        }),

        buildingType: TextField({
            label: "Building type"
        }),

        lastUpdatedDate: TextField({
            label: "Last updated date"
        }),

        matID: TextField({
            label: "Mat ID",
            required: true
        }),

        name: TextField({
            label: "Name"
        }),

        notes: NumberField({
            label: "Notes"
        })

    }
)

export default new SpaceConfig({
    // This name will display under "Config" when creating a new Space. ID value of deployed "SpaceConfig" seen in the terminal will be the same as shown in the UI.
    name: "Master Address",
    workbookConfigs: {
        "master_address_workbook": new Workbook({
            // This name will display on the left panel once you create and then open a relevant space in the UI.
            name: "Master Address",
            sheets: {
                master_address_sheet
            },
        })
    }
})