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
    Message,
    OptionField,
    ComputedField
} from '@flatfile/configure'

import {SmartDateField} from '../../examples/fields/SmartDateField'
import {countries} from './countries'

// This is the key of the sheet
export const master_address_sheet = new Sheet(
    // This is the label of the sheet that will be visible in your Flatfile dashboard
    'Master Address',
    {
        // This is the key of the field
        streetNo: NumberField({
            // This is the label of the field that will be visible to a user importing a file.
            label: "Location Street number",
            // This specifies that the field is required.
            required: true
        }),

        streetName: TextField({
            label: "Location Street name",
            description: "Location street name with or without suffix (any suffix will be automatically appended)",
            required: true
        }),

        streetSuffix:  TextField({
            label: "Location Street suffix"
        }),

        unit: NumberField({
            label: "Location Unit"
        }),

        city: TextField({
            label: "Location City",
            required: true
        }),

        state: TextField({
            label: "Location State",
            required: true
        }),

        postalCode: NumberField({
            label: "Location Postal code",
            required: true
        }),

        country: OptionField({
            label: "Location Country",
            options: countries
        }),

        gisID: TextField({
            label: "Gis ID"
        }),

        // can use these to compute internal-only fields that you do not expect mapping against
        latitude: ComputedField(
            NumberField({
                label: "Latitude"}),
                {dependsOn: [],
                compute: ({}) => {},
                destination: "latitude"
            }),
        
        longitude: ComputedField(
            NumberField({
                label: "Longitude"}),
                {dependsOn: [],
                compute: ({}) => {},
                destination: "longitude"
            }),

        // can't have a year in the future; smart date field allows any formatted date to be parsed into a yyyy format
        // yearBuilt: SmartDateField({
        //     formatString: "yyyy",
        //     validate: (yearBuilt:Date) => {
        //      const currYear = new Date()
        //      if (currYear.getFullYear() < yearBuilt.getFullYear()) {
        //         return [
        //             new Message(
        //                 `${yearBuilt} is listed as being built in the future`,
        //                 'error',
        //                 'validate'
        //             )
        //         ]
        //      }
        //     }

        // }),

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

        sewage: OptionField({
            label: "Sewage",
            options:{
                1:{label:"septic"},
                2:{label:"central"},
                3:{label:"local"},
                4:{label:"oneschema"}
            }
        }),

        ownerName: TextField({
            label: "Owner name"
        }),

        ownerStreetAddress: TextField({
            label: "Owner street name or street address"
        }),

        ownerStreetSuffix: TextField({
            label: "Owner street suffix"
        }),

        ownerStreetNo: TextField({
            label: "Owner street number"
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

        ownerCountry: OptionField({
            label: "Owner country",
            options: countries
        }),

        ownerPhoneNo: TextField({
            label: "Owner phone number"
        }),

        ownerEmail: TextField({
            label: "Owner email"
        }),

        occupancyType: OptionField({
            label: "Occupancy type",
            options: {
                1:{label:"Option 1"},
                2:{label:"Option 2"}
            }
        }),

        buildingType: OptionField({
            label: "Building type",
            options: {
                1:{label:"Option 1"},
                2:{label:"Option 2"}
            }
        }),

        lastUpdatedDate: SmartDateField({
            label: "Last updated date"
        }),

        // what is print_key -> is it an identifier that can be mapped to any of several
        //  "primary keys"?

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

    },
    {
      recordCompute: (record) => {
        //trim all address fields: ownerStreetNo, ownerStreetAddress, ownerStreetSuffix, ownerUnit, streetSuffix, streetName
        //if ownerStreetNo is not null then ownerStreetNo + ' ' + ownerStreetAddress
        //if ownerStreetSuffix is not null then ownerStreetAddress + ' ' + ownerStreetSuffix
        //if ownerUnit is not null then ownerStreetAddress + ', Unit:' + ownerUnit
        //if streetSuffix is not null then streetName + ' ' + streetSuffix

        //address parsing validation for location and owner addresses
        // validate that the zip is a valid zip
        // fill in missing values where they exist

    }
}
)